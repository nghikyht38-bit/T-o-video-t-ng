import { CharacterProfile, ReferenceImage, Scene, StudioConfig } from '../types';

export const STORAGE_KEY = 'autovideo_studio_project_state';

export interface SavedProjectState {
  version: string;
  lastSaved: string;
  idea: string;
  characterSeed: string;
  referenceImages: ReferenceImage[];
  config: StudioConfig;
  projectTitle: string;
  projectSummary: string;
  characterProfile: CharacterProfile;
  scenes: Scene[];
}

/**
 * Sanitizes scenes for JSON serialization (stripping non-serializable Blobs)
 */
function sanitizeScenesForStorage(scenes: Scene[]): Scene[] {
  return scenes.map((scene) => {
    // Exclude videoBlob (cannot be serialized to JSON)
    // Note: blob: URLs are invalid after page reload, but data: URLs persist
    const isBlobVideo = scene.videoUrl?.startsWith('blob:');
    
    return {
      ...scene,
      videoBlob: undefined,
      videoUrl: isBlobVideo ? undefined : scene.videoUrl,
      videoStatus: isBlobVideo && scene.videoStatus === 'ready' ? 'idle' : scene.videoStatus,
    };
  });
}

/**
 * Saves project state to localStorage with QuotaExceededError protection
 */
export function saveProjectToLocalStorage(state: {
  idea: string;
  characterSeed: string;
  referenceImages: ReferenceImage[];
  config: StudioConfig;
  projectTitle: string;
  projectSummary: string;
  characterProfile: CharacterProfile;
  scenes: Scene[];
}): { success: boolean; error?: string; timestamp: string } {
  const timestamp = new Date().toISOString();

  const dataToSave: SavedProjectState = {
    version: '1.0',
    lastSaved: timestamp,
    idea: state.idea || '',
    characterSeed: state.characterSeed || '',
    referenceImages: state.referenceImages || [],
    config: state.config,
    projectTitle: state.projectTitle || 'Dự án Video AI',
    projectSummary: state.projectSummary || '',
    characterProfile: state.characterProfile,
    scenes: sanitizeScenesForStorage(state.scenes || []),
  };

  try {
    const json = JSON.stringify(dataToSave);
    localStorage.setItem(STORAGE_KEY, json);
    return { success: true, timestamp };
  } catch (err: any) {
    // If quota exceeded, try saving without heavy image data URLs to preserve all prompts, configs & dialogues
    if (err.name === 'QuotaExceededError' || err.code === 22) {
      console.warn('LocalStorage quota exceeded, optimizing saved project data...');
      try {
        const lightweightScenes = dataToSave.scenes.map((s) => ({
          ...s,
          imageUrl: s.imageUrl && s.imageUrl.length > 50000 ? undefined : s.imageUrl,
          imageStatus: s.imageUrl && s.imageUrl.length > 50000 ? 'idle' : s.imageStatus,
        }));

        const lightweightData: SavedProjectState = {
          ...dataToSave,
          referenceImages: [], // strip reference images if too large
          scenes: lightweightScenes as Scene[],
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(lightweightData));
        return { success: true, timestamp };
      } catch (retryErr: any) {
        console.error('Failed to save even lightweight project to localStorage:', retryErr);
        return { success: false, error: retryErr.message, timestamp };
      }
    }

    console.error('LocalStorage save error:', err);
    return { success: false, error: err.message, timestamp };
  }
}

/**
 * Loads project state from localStorage
 */
export function loadProjectFromLocalStorage(): SavedProjectState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as SavedProjectState;
    if (!parsed || (!parsed.scenes && !parsed.config && !parsed.idea)) {
      return null;
    }

    return parsed;
  } catch (err) {
    console.error('Failed to load project from localStorage:', err);
    return null;
  }
}

/**
 * Clears project state from localStorage
 */
export function clearProjectLocalStorage(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear project from localStorage:', err);
  }
}
