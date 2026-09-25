import React, { useState } from 'react';
import { Users, Check, Edit2, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';
import { CharacterProfile } from '../types';

interface CharacterConsistencyBannerProps {
  characterProfile: CharacterProfile;
  onChangeProfile: (updated: CharacterProfile) => void;
}

export const CharacterConsistencyBanner: React.FC<CharacterConsistencyBannerProps> = ({
  characterProfile,
  onChangeProfile,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<CharacterProfile>(characterProfile);

  const handleSave = () => {
    onChangeProfile(draft);
    setIsEditing(false);
  };

  return (
    <div className="bg-gradient-to-r from-[#12281c] via-[#0f2117] to-[#0a170f] border border-[#234d35] rounded-2xl p-4 shadow-lg mb-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-600/30 text-emerald-300 border border-emerald-500/50 flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold text-emerald-100 uppercase tracking-wider">
                Bản Thiết Kế Nhân Vật Gốc (Master Character Consistency Anchor)
              </h3>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" /> Đang Đồng Bộ 100% Cảnh
              </span>
            </div>
            <p className="text-[11px] text-emerald-400/90 mt-0.5">
              Nhân vật: <strong className="text-white">{characterProfile.name}</strong> •{' '}
              {characterProfile.clothing}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setDraft(characterProfile);
              setIsEditing(!isEditing);
              if (!isExpanded) setIsExpanded(true);
            }}
            className="px-2.5 py-1 rounded-lg bg-[#14291e] hover:bg-[#1c3829] border border-[#21432f] text-emerald-200 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Edit2 className="w-3 h-3 text-emerald-400" />
            <span>{isEditing ? 'Hủy sửa' : 'Chỉnh sửa'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded-lg hover:bg-[#14291e] text-emerald-400 hover:text-white transition-colors cursor-pointer"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-[#1a3826] grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {isEditing ? (
            <>
              <div className="bg-[#09140e] p-2.5 rounded-lg border border-[#1e3c2a]">
                <span className="text-emerald-500 text-[10px] font-semibold">Tên & Độ tuổi:</span>
                <input
                  type="text"
                  value={draft.name}
                  onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                  className="w-full bg-[#0d1d14] border border-[#234b34] rounded p-1 text-xs text-white mt-1"
                />
              </div>
              <div className="bg-[#09140e] p-2.5 rounded-lg border border-[#1e3c2a]">
                <span className="text-emerald-500 text-[10px] font-semibold">Đặc điểm nhận diện:</span>
                <input
                  type="text"
                  value={draft.appearance}
                  onChange={(e) => setDraft({ ...draft, appearance: e.target.value })}
                  className="w-full bg-[#0d1d14] border border-[#234b34] rounded p-1 text-xs text-white mt-1"
                />
              </div>
              <div className="bg-[#09140e] p-2.5 rounded-lg border border-[#1e3c2a]">
                <span className="text-emerald-500 text-[10px] font-semibold">Trang phục cố định:</span>
                <input
                  type="text"
                  value={draft.clothing}
                  onChange={(e) => setDraft({ ...draft, clothing: e.target.value })}
                  className="w-full bg-[#0d1d14] border border-[#234b34] rounded p-1 text-xs text-white mt-1"
                />
              </div>
              <div className="md:col-span-3 flex justify-end gap-2 mt-1">
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  Lưu thay đổi nhân vật
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="bg-[#09140e]/70 p-2.5 rounded-lg border border-[#1e3c2a]">
                <span className="text-emerald-500 text-[10px] font-semibold block">Đặc điểm diện mạo:</span>
                <span className="text-emerald-200 mt-1 block">{characterProfile.appearance}</span>
              </div>
              <div className="bg-[#09140e]/70 p-2.5 rounded-lg border border-[#1e3c2a]">
                <span className="text-emerald-500 text-[10px] font-semibold block">Trang phục cố định:</span>
                <span className="text-emerald-200 mt-1 block">{characterProfile.clothing}</span>
              </div>
              <div className="bg-[#09140e]/70 p-2.5 rounded-lg border border-[#1e3c2a]">
                <span className="text-emerald-500 text-[10px] font-semibold block">Tokens đồng bộ:</span>
                <span className="text-lime-300 font-mono text-[10px] mt-1 block truncate">
                  {characterProfile.consistencyTokens}
                </span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
