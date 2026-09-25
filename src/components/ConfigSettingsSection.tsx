import React from 'react';
import {
  Settings,
  Cpu,
  Mic,
  Palette,
  Layers,
  Clock,
  Maximize2,
  ExternalLink,
  Volume2,
  VolumeX,
} from 'lucide-react';
import {
  AspectRatio,
  StudioConfig,
  VideoDuration,
  VideoModel,
  VideoStyle,
  VoiceOption,
} from '../types';

interface ConfigSettingsSectionProps {
  config: StudioConfig;
  setConfig: React.Dispatch<React.SetStateAction<StudioConfig>>;
}

export const ConfigSettingsSection: React.FC<ConfigSettingsSectionProps> = ({
  config,
  setConfig,
}) => {
  const models: { id: VideoModel; label: string; badge: string; desc: string }[] = [
    {
      id: 'veo 3.1-fast',
      label: 'veo 3.1-fast',
      badge: 'Khuyên Dùng',
      desc: 'Tốc độ render nhanh nhất, chuyển động mượt mà',
    },
    {
      id: 'veo 3.1-Lite',
      label: 'veo 3.1-Lite',
      badge: 'Tiết Kiệm',
      desc: 'Tối ưu độ trễ và tài nguyên hệ thống',
    },
    {
      id: 'veo 3.1-quality',
      label: 'veo 3.1-quality',
      badge: 'Ultra HD',
      desc: 'Chất lượng điện ảnh cao cấp, chi tiết ánh sáng cao',
    },
    {
      id: 'omni 1.1Flast',
      label: 'omni 1.1Flast',
      badge: 'Multimodal',
      desc: 'Tạo đa phương thái hình ảnh & âm thanh đồng bộ',
    },
  ];

  const styles: VideoStyle[] = [
    'Điện Ảnh',
    'Hoạt Hình',
    'Sân Khấu',
    'Tối Giản',
    'Phim Ảnh',
    'Anime 3D',
    'Cyberpunk',
    'Tranh Thủy Mặc',
    'Cổ Trang Huyền Huyễn',
  ];

  const voices: VoiceOption[] = [
    'Nam Miền Bắc',
    'Nam Miền Trung',
    'Nam Miền Nam',
    'Nữ Miền Bắc',
    'Nữ Miền Trung',
    'Nữ Miền Nam',
  ];

  const durations: VideoDuration[] = ['5s', '8s', '10s', '15s'];

  const ratios: { id: AspectRatio; label: string; iconDesc: string }[] = [
    { id: '16:9', label: '16:9 (Ngang)', iconDesc: 'YouTube, Web, TV' },
    { id: '9:16', label: '9:16 (Dọc)', iconDesc: 'TikTok, Reels, Shorts' },
    { id: '1:1', label: '1:1 (Vuông)', iconDesc: 'Instagram, Feed' },
  ];

  const quickCounts = [3, 5, 8, 12, 20, 50, 100];

  return (
    <div className="bg-[#0f1f16]/90 border border-[#1e3d2b] rounded-2xl p-5 shadow-xl mb-5">
      <div className="flex items-center justify-between mb-4 border-b border-[#1b3827] pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-6 bg-emerald-500 rounded-full inline-block"></span>
          <h2 className="text-base font-bold text-emerald-100 uppercase tracking-wider flex items-center gap-2">
            <Settings className="w-4 h-4 text-emerald-400" />
            2. Khung Cài Đặt Cấu Hình Cho Video
          </h2>
        </div>
        <a
          href="https://flow.google.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-lime-400 hover:text-lime-300 flex items-center gap-1 hover:underline font-medium"
        >
          <span>Google Flow API Portal</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Grid: Matches layout diagram */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. CHỌN MODEL */}
        <div className="bg-[#112419] border border-[#1e3d2b] rounded-xl p-3.5 flex flex-col justify-between shadow-inner">
          <div>
            <label className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5 mb-2">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              Chọn Model
            </label>
            <select
              value={config.model}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, model: e.target.value as VideoModel }))
              }
              className="w-full bg-[#08120c] border border-[#1e3c2a] rounded-lg px-3 py-2 text-sm text-emerald-100 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              {models.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label} ({m.badge})
                </option>
              ))}
            </select>
          </div>
          <p className="text-[11px] text-emerald-500/90 mt-2">
            API nguồn: <code className="text-lime-400">flow.google.com</code>
          </p>
        </div>

        {/* 2. CÓ LỜI THOẠI / KHÔNG CÓ LỜI THOẠI */}
        <div className="bg-[#112419] border border-[#1e3d2b] rounded-xl p-3.5 flex flex-col justify-between shadow-inner">
          <div>
            <label className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5 mb-2">
              <Mic className="w-3.5 h-3.5 text-lime-400" />
              Lời Thoại & Thuyết Minh
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setConfig((prev) => ({ ...prev, hasDialogue: true }))}
                className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-medium cursor-pointer transition-all border ${
                  config.hasDialogue
                    ? 'bg-emerald-600/30 text-emerald-200 border-emerald-500 font-bold shadow-sm'
                    : 'bg-[#08120c] text-emerald-600 border-[#1e3c2a] hover:border-[#2a543b]'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5" />
                Có lời thoại
              </button>
              <button
                type="button"
                onClick={() => setConfig((prev) => ({ ...prev, hasDialogue: false }))}
                className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-medium cursor-pointer transition-all border ${
                  !config.hasDialogue
                    ? 'bg-emerald-600/30 text-emerald-200 border-emerald-500 font-bold shadow-sm'
                    : 'bg-[#08120c] text-emerald-600 border-[#1e3c2a] hover:border-[#2a543b]'
                }`}
              >
                <VolumeX className="w-3.5 h-3.5" />
                Không lời thoại
              </button>
            </div>
          </div>
          <p className="text-[11px] text-emerald-500/90 mt-2">
            {config.hasDialogue ? 'Tự tạo kịch bản nói + Subtitle' : 'Nhạc nền & Ambient sound'}
          </p>
        </div>

        {/* 3. PHONG CÁCH */}
        <div className="bg-[#112419] border border-[#1e3d2b] rounded-xl p-3.5 flex flex-col justify-between shadow-inner">
          <div>
            <label className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5 mb-2">
              <Palette className="w-3.5 h-3.5 text-emerald-400" />
              Phong Cách Hình Ảnh & Video
            </label>
            <select
              value={config.style}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, style: e.target.value as VideoStyle }))
              }
              className="w-full bg-[#08120c] border border-[#1e3c2a] rounded-lg px-3 py-2 text-sm text-emerald-100 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              {styles.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <p className="text-[11px] text-emerald-500/90 mt-2">
            Áp dụng chuẩn phong cách cho 100% cảnh
          </p>
        </div>

        {/* 4. GIỌNG ĐỌC & GHI CHÚ SẮC THÁI */}
        <div className="bg-[#112419] border border-[#1e3d2b] rounded-xl p-3.5 flex flex-col justify-between shadow-inner">
          <div>
            <label className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5 mb-2">
              <Mic className="w-3.5 h-3.5 text-lime-400" />
              Ngôn Ngữ & Giọng Đọc (Việt Nam)
            </label>
            <select
              disabled={!config.hasDialogue}
              value={config.voice}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, voice: e.target.value as VoiceOption }))
              }
              className="w-full bg-[#08120c] border border-[#1e3c2a] rounded-lg px-3 py-2 text-sm text-emerald-100 focus:outline-none focus:border-emerald-500 cursor-pointer disabled:opacity-50"
            >
              {voices.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>

            {/* Ghi chú sắc thái giọng đọc */}
            {config.hasDialogue && (
              <div className="mt-2 pt-2 border-t border-[#183623]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-semibold text-lime-300">
                    Ghi chú sắc thái lời thoại:
                  </span>
                </div>
                <input
                  type="text"
                  value={config.voiceTone || 'Đọc nhẹ, nhanh, giọng trầm ấm'}
                  onChange={(e) =>
                    setConfig((prev) => ({ ...prev, voiceTone: e.target.value }))
                  }
                  placeholder="VD: Đọc nhẹ, nhanh, giọng trầm ấm..."
                  className="w-full bg-[#08120c] border border-[#1e3c2a] rounded px-2 py-1 text-xs text-lime-200 placeholder-emerald-700 focus:outline-none focus:border-lime-500"
                />
                <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                  {[
                    'Đọc nhẹ, nhanh, giọng trầm ấm',
                    'Trầm ấm, truyền cảm',
                    'Đọc nhẹ nhàng',
                    'Nhanh, kịch tính',
                  ].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() =>
                        setConfig((prev) => ({ ...prev, voiceTone: preset }))
                      }
                      className={`px-1.5 py-0.5 rounded text-[9px] border transition-colors cursor-pointer ${
                        (config.voiceTone || 'Đọc nhẹ, nhanh, giọng trầm ấm') === preset
                          ? 'bg-emerald-600/40 text-emerald-200 border-emerald-500 font-bold'
                          : 'bg-[#08120c] text-emerald-400 border-[#183523] hover:border-emerald-700'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <p className="text-[10px] text-emerald-500/90 mt-2">
            Đầy đủ 3 miền: Bắc • Trung • Nam
          </p>
        </div>
      </div>

      {/* Row 2 of Config: Quantity, Duration, Aspect Ratio */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-4 pt-4 border-t border-[#183623]">
        {/* SỐ LƯỢNG HÌNH ẢNH / VIDEO CẦN TẠO (Col 5) */}
        <div className="md:col-span-5 bg-[#112419] border border-[#1e3d2b] rounded-xl p-3.5 shadow-inner">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-lime-400" />
              Số Lượng Cảnh Cần Tạo Hàng Loạt
            </label>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
              {config.sceneCount} cảnh (Tối đa 100)
            </span>
          </div>

          <input
            type="range"
            min={1}
            max={100}
            step={1}
            value={config.sceneCount}
            onChange={(e) =>
              setConfig((prev) => ({ ...prev, sceneCount: Number(e.target.value) }))
            }
            className="w-full h-2 bg-[#08120c] rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />

          {/* Quick Preset Buttons */}
          <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
            <span className="text-[10px] text-emerald-500">Chọn nhanh:</span>
            {quickCounts.map((cnt) => (
              <button
                key={cnt}
                type="button"
                onClick={() => setConfig((prev) => ({ ...prev, sceneCount: cnt }))}
                className={`px-2 py-0.5 rounded text-[11px] font-mono cursor-pointer transition-colors border ${
                  config.sceneCount === cnt
                    ? 'bg-emerald-600 text-white border-emerald-500 font-bold'
                    : 'bg-[#08120c] text-emerald-400 border-[#1e3c2a] hover:border-[#2a543b]'
                }`}
              >
                {cnt}
              </button>
            ))}
          </div>

          <p className="text-[10px] text-emerald-500/90 mt-2 italic">
            * Hệ thống tự sắp xếp tạo lượt chạy thông minh để hoàn thành trọn bộ 100 video.
          </p>
        </div>

        {/* THỜI GIAN MỖI CẢNH (Col 3) */}
        <div className="md:col-span-3 bg-[#112419] border border-[#1e3d2b] rounded-xl p-3.5 flex flex-col justify-between shadow-inner">
          <div>
            <label className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5 mb-2">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              Thời Gian Mỗi Cảnh (8s - 15s)
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {durations.map((dur) => (
                <button
                  key={dur}
                  type="button"
                  onClick={() => setConfig((prev) => ({ ...prev, duration: dur }))}
                  className={`py-2 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                    config.duration === dur
                      ? 'bg-emerald-500/25 text-emerald-200 border-emerald-500 shadow-sm'
                      : 'bg-[#08120c] text-emerald-500 border-[#1e3c2a] hover:border-[#2a543b]'
                  }`}
                >
                  {dur}
                </button>
              ))}
            </div>
          </div>
          <p className="text-[10px] text-emerald-500/90 mt-2">
            Khớp với tiêu chuẩn video ngắn hiện đại
          </p>
        </div>

        {/* KÍCH THƯỚC KHUNG HÌNH (Col 4) */}
        <div className="md:col-span-4 bg-[#112419] border border-[#1e3d2b] rounded-xl p-3.5 flex flex-col justify-between shadow-inner">
          <div>
            <label className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5 mb-2">
              <Maximize2 className="w-3.5 h-3.5 text-lime-400" />
              Kích Thước Khung Hình
            </label>
            <div className="grid grid-cols-3 gap-2">
              {ratios.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setConfig((prev) => ({ ...prev, aspectRatio: r.id }))}
                  className={`py-2 px-2 rounded-lg text-center transition-all border cursor-pointer ${
                    config.aspectRatio === r.id
                      ? 'bg-emerald-500/25 text-emerald-200 border-emerald-500 font-bold shadow-sm'
                      : 'bg-[#08120c] text-emerald-500 border-[#1e3c2a] hover:border-[#2a543b]'
                  }`}
                >
                  <div className="text-xs font-mono">{r.id}</div>
                  <div className="text-[10px] text-emerald-400 truncate">{r.label.split(' ')[1]}</div>
                </button>
              ))}
            </div>
          </div>
          <p className="text-[10px] text-emerald-500/90 mt-2">
            Đồng bộ tỉ lệ cho cả hình ảnh và video
          </p>
        </div>
      </div>
    </div>
  );
};
