import { ReferenceImage, Scene, ScriptAnalysisResult, StudioConfig } from '../types';

export async function analyzeScript(
  idea: string,
  config: StudioConfig,
  referenceImages: ReferenceImage[] = [],
  characterSeed?: string
): Promise<ScriptAnalysisResult> {
  const payload = {
    idea,
    sceneCount: config.sceneCount,
    model: config.model,
    hasDialogue: config.hasDialogue,
    style: config.style,
    voice: config.voice,
    voiceTone: config.voiceTone || 'đọc nhẹ, nhanh, giọng trầm ấm',
    duration: config.duration,
    aspectRatio: config.aspectRatio,
    referenceImages: referenceImages.map((img) => ({
      data: img.data,
      mimeType: img.mimeType,
      name: img.name,
    })),
    characterSeed,
  };

  const response = await fetch('/api/analyze-script', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Lỗi phân tích kịch bản (${response.status})`);
  }

  const data = await response.json();

  // Ensure scenes have proper IDs and initial states
  const formattedScenes: Scene[] = (data.scenes || []).map((sc: any, index: number) => ({
    id: `scene-${index + 1}-${Date.now()}`,
    sceneNumber: sc.sceneNumber || index + 1,
    title: sc.title || `Phân cảnh ${index + 1}`,
    imagePrompt: sc.imagePrompt || '',
    imagePromptVi: sc.imagePromptVi || '',
    videoPrompt: sc.videoPrompt || '',
    videoPromptVi: sc.videoPromptVi || '',
    cameraMovement: sc.cameraMovement || 'Cinematic Dolly',
    dialogue: sc.dialogue || '',
    voiceToneNote: sc.voiceToneNote || config.voiceTone || 'đọc nhẹ, nhanh, giọng trầm ấm',
    duration: sc.duration || config.duration,
    imageStatus: 'idle',
    videoStatus: 'idle',
  }));

  return {
    title: data.title || 'Kịch Bản Video Hàng Loạt',
    summary: data.summary || '',
    characterProfile: data.characterProfile || {
      name: 'Nhân vật chính',
      appearance: 'Đồng bộ khuôn mặt và phong cách',
      clothing: 'Trang phục chuẩn kịch bản',
      consistencyTokens: 'consistent master character',
    },
    scenes: formattedScenes,
  };
}

export async function generateSceneImage(
  prompt: string,
  aspectRatio: string,
  referenceImage?: ReferenceImage | null,
  characterConsistency?: string
): Promise<string> {
  const payload: any = {
    prompt,
    aspectRatio,
    characterConsistency,
  };

  if (referenceImage) {
    payload.referenceImage = {
      data: referenceImage.data,
      mimeType: referenceImage.mimeType,
    };
  }

  const response = await fetch('/api/generate-image', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || 'Lỗi khi tạo ảnh qua API');
  }

  const data = await response.json();
  return data.imageUrl;
}

export async function generateSceneSpeech(
  text: string,
  voice: string,
  voiceTone: string = 'đọc nhẹ, nhanh, giọng trầm ấm'
): Promise<string | undefined> {
  try {
    const response = await fetch('/api/generate-tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, voice, voiceTone }),
    });

    if (!response.ok) {
      return undefined;
    }

    const data = await response.json();
    return data.audioData || undefined;
  } catch {
    return undefined;
  }
}

export async function generateVeoVideo(
  prompt: string,
  model: string,
  aspectRatio: string,
  imageBase64?: string,
  onProgress?: (msg: string) => void
): Promise<string> {
  onProgress?.('Đang gửi yêu cầu khởi tạo Veo Video...');
  const initRes = await fetch('/api/generate-video', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, model, aspectRatio, imageBase64 }),
  });

  if (!initRes.ok) {
    const err = await initRes.json().catch(() => ({}));
    throw new Error(err.error || 'Lỗi bắt đầu Veo Video');
  }

  const initData = await initRes.json();
  const operationName = initData.operationName;

  // Poll for completion
  let attempts = 0;
  const maxAttempts = 60; // 5 minutes max
  while (attempts < maxAttempts) {
    attempts++;
    onProgress?.(`Đang render video Veo (${attempts * 5}s)... Vui lòng đợi.`);
    await new Promise((r) => setTimeout(r, 5000));

    const statusRes = await fetch('/api/video-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ operationName }),
    });

    if (!statusRes.ok) continue;
    const statusData = await statusRes.json();

    if (statusData.error) {
      throw new Error(statusData.error.message || 'Lỗi từ Veo Video API');
    }

    if (statusData.done && statusData.hasVideo) {
      onProgress?.('Video đã render xong! Đang tải stream video...');
      const dlRes = await fetch('/api/video-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operationName }),
      });

      if (!dlRes.ok) {
        throw new Error('Không thể tải video từ server');
      }

      const blob = await dlRes.blob();
      return URL.createObjectURL(blob);
    }
  }

  throw new Error('Hết thời gian chờ kết quả từ Veo API.');
}
