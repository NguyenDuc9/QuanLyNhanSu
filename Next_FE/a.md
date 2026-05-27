'use client';

import { useEffect, useState } from 'react';
import {
Plus,
Pencil,
Trash2,
ArrowLeft,
Clock,
UserCheck,
LogOut,
CheckCircle,
List,
AlertCircle,
} from 'lucide-react';

import ChamCong from '@/service/ChamCong.api';
import {
createChamCong,
getAllChamCong,
updateChamCong,
deleteChamCong,
} from '@/service/ChamCong.api';
import ChamCongChiTiet from '@/service/ChiTietCC.api';
import { getChiTietByCa, chamVao, chamRa } from '@/service/ChiTietCC.api';

// ===================== CONSTANTS =====================
const CA_OPTIONS = ['Ca 1', 'Ca 2', 'Ca 3'];
const todayISO = () => new Date().toISOString().split('T')[0];

type ViewMode = 'list' | 'nhanvien' | 'detail' | 'lichsu';

// ========================= COMPONENT =========================
export default function ChamCongPage() {
// ---- State danh sách ca ----
const [data, setData] = useState<ChamCong[]>([]);
const [search, setSearch] = useState('');
const [showForm, setShowForm] = useState(false);
const [isEdit, setIsEdit] = useState(false);
const [formCa, setFormCa] = useState('Ca 1');
const [editId, setEditId] = useState<number | null>(null);

// ---- State views ----
const [viewMode, setViewMode] = useState<ViewMode>('list');
const [selectedCa, setSelectedCa] = useState<ChamCong | null>(null);
const [chiTiet, setChiTiet] = useState<ChamCongChiTiet[]>([]);
const [loadingDetail, setLoadingDetail] = useState(false);

// ---- State lịch sử chấm công hôm nay ----
const [lichSuHomNay, setLichSuHomNay] = useState<ChamCongChiTiet[]>([]);
const [loadingLichSu, setLoadingLichSu] = useState(false);

// ---- toast ----
const [toast, setToast] = useState<{
msg: string;
type: 'ok' | 'err';
} | null>(null);
const showToast = (msg: string, type: 'ok' | 'err' = 'ok') => {
setToast({ msg, type });
setTimeout(() => setToast(null), 3000);
};

// ========================= HELPERS =========================
const loadData = async () => setData(await getAllChamCong());

useEffect(() => {
loadData();
}, []);

const loadChiTiet = async (maChamCong: number) => {
setLoadingDetail(true);
setChiTiet(await getChiTietByCa(maChamCong));
setLoadingDetail(false);
};

/\*\*

- Lấy toàn bộ chi tiết của các ca hôm nay.
- Lọc data theo ThoiGian === todayISO(), sau đó gom tất cả ChiTiet lại.
  \*/
  const loadLichSuHomNay = async () => {
  setLoadingLichSu(true);
  const homNay = todayISO();
  const caHomNay = data.filter((c) => c.ThoiGian === homNay);
  const lists = await Promise.all(
  caHomNay.map((c) => getChiTietByCa(c.MaChamCong)),
  );
  // Gắn thêm tên ca cho mỗi chi tiết
  const merged = lists.flatMap((arr, i) =>
  arr.map((ct) => ({ ...ct, \_tenCa: caHomNay[i].CaLamViec })),
  );
  setLichSuHomNay(merged);
  setLoadingLichSu(false);
  };

// ========================= CA ACTIONS =========================
const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();
if (isEdit && editId !== null) {
await updateChamCong(editId, { CaLamViec: formCa });
} else {
await createChamCong({ CaLamViec: formCa, ThoiGian: todayISO() });
}
setShowForm(false);
setIsEdit(false);
setFormCa('Ca 1');
setEditId(null);
loadData();
};

const openCreate = () => {
setIsEdit(false);
setEditId(null);
setFormCa('Ca 1');
setShowForm(true);
};

const openEdit = (ca: ChamCong, e: React.MouseEvent) => {
e.stopPropagation();
setFormCa(ca.CaLamViec);
setEditId(ca.MaChamCong);
setIsEdit(true);
setShowForm(true);
};

const handleDelete = async (id: number, e: React.MouseEvent) => {
e.stopPropagation();
if (confirm('Bạn có chắc muốn xóa ca này?')) {
await deleteChamCong(id);
loadData();
}
};

// Bước 1: click vào ca → hiện danh sách nhân viên
const openNhanVien = (ca: ChamCong) => {
setSelectedCa(ca);
setViewMode('nhanvien');
loadChiTiet(ca.MaChamCong);
};

// Bước 2: sau khi chấm vào → hiển thị chi tiết ca (view detail)
const openDetail = (ca: ChamCong) => {
setSelectedCa(ca);
setViewMode('detail');
loadChiTiet(ca.MaChamCong);
};

// ========================= CHẤM VÀO / RA =========================
/\*\*

- Chấm vào: gọi API, reload chi tiết rồi chuyển sang view detail
  \*/
  const handleChamVao = async (maNV: string) => {
  if (!selectedCa) return;
  await chamVao(maNV, selectedCa.MaChamCong);
  showToast(`Chấm công thành công cho ${maNV}`);
  await loadChiTiet(selectedCa.MaChamCong);
  setViewMode('detail');
  };

/\*\*

- Chấm ra: chỉ cho phép nếu ngày trong bảng ChamCong === ngày hôm nay
  \*/
  const handleChamRa = async (maNV: string) => {
  if (!selectedCa) return;


    // -------- ĐIỀU KIỆN CHẶN --------
    const ngayCa = selectedCa.ThoiGian; // 'YYYY-MM-DD'
    const homNay = todayISO();
    if (ngayCa !== homNay) {
      showToast(
        `Không thể chấm ra — ca này thuộc ngày ${ngayCa}, không phải hôm nay (${homNay})`,
        'err',
      );
      return;
    }
    // --------------------------------

    await chamRa(maNV, selectedCa.MaChamCong);
    showToast(`Chấm ra thành công cho ${maNV}`);
    loadChiTiet(selectedCa.MaChamCong);

};

const filtered = data.filter(
(c) =>
String(c.MaChamCong).includes(search) ||
c.CaLamViec?.toLowerCase().includes(search.toLowerCase()),
);

const daCham = chiTiet.filter((nv) => nv.GioVao);
const chuaCham = chiTiet.filter((nv) => !nv.GioVao);

// ========================= VIEW: DANH SÁCH NHÂN VIÊN (sau khi chọn ca) =========================
if (viewMode === 'nhanvien' && selectedCa) {
const isToday = selectedCa.ThoiGian === todayISO();
return (
<div style={s.page}>
{toast && <Toast msg={toast.msg} type={toast.type} />}
<button style={s.backBtn} onClick={() => setViewMode('list')}>
<ArrowLeft size={16} /> Quay lại danh sách ca
</button>

        {/* Header ca */}
        <div style={s.caHeader}>
          <div>
            <div style={s.caLabel}>CA LÀM VIỆC</div>
            <div style={s.caName}>{selectedCa.CaLamViec}</div>
            <div style={s.caDate}>{selectedCa.ThoiGian}</div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {/* Nút xem lịch sử hôm nay */}
            <button
              style={s.btnOutline}
              onClick={() => {
                loadLichSuHomNay();
                setViewMode('lichsu');
              }}
            >
              <List size={15} /> Lịch sử hôm nay
            </button>
          </div>
        </div>

        {!isToday && (
          <div style={s.warningBanner}>
            <AlertCircle size={16} />
            Ca này thuộc ngày <strong>{selectedCa.ThoiGian}</strong> — không
            phải hôm nay. Tính năng chấm ra sẽ bị khóa.
          </div>
        )}

        <div style={s.card}>
          <h2 style={s.cardTitle}>Danh sách nhân viên trong ca</h2>
          {loadingDetail ? (
            <div style={s.loadingBox}>Đang tải...</div>
          ) : (
            <table style={s.table}>
              <thead>
                <tr style={s.thead}>
                  {[
                    'Mã NV',
                    'Tên NV',
                    'Trạng thái',
                    'Giờ vào',
                    'Hành động',
                  ].map((h) => (
                    <th key={h} style={s.th}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {chiTiet.map((nv) => {
                  const daNhanVao = !!nv.GioVao;
                  return (
                    <tr key={`${nv.MaNV}-${nv.MaChiTiet}`} style={s.tr}>
                      <td style={s.td}>{nv.MaNV}</td>
                      <td style={{ ...s.td, fontWeight: 500 }}>
                        {nv.HoTen ?? nv.MaNV}
                      </td>
                      <td style={s.td}>
                        {daNhanVao ? (
                          <span style={s.badgeGreen}>● Đã chấm vào</span>
                        ) : (
                          <span style={s.badgeRed}>● Chưa chấm</span>
                        )}
                      </td>
                      <td style={s.td}>{nv.GioVao ?? '—'}</td>
                      <td style={s.td}>
                        {daNhanVao ? (
                          <span style={s.actionDone}>✓ Đã chấm công</span>
                        ) : (
                          <button
                            style={s.btnChamCong}
                            onClick={() => handleChamVao(nv.MaNV)}
                          >
                            <UserCheck size={14} /> Chấm công
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {chiTiet.length === 0 && (
                  <tr>
                    <td colSpan={5} style={s.emptyCell}>
                      Không có nhân viên trong ca này
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );

}

// ========================= VIEW: CHI TIẾT CA (sau khi chấm vào) =========================
if (viewMode === 'detail' && selectedCa) {
const isToday = selectedCa.ThoiGian === todayISO();
return (
<div style={s.page}>
{toast && <Toast msg={toast.msg} type={toast.type} />}
<div style={s.detailNavRow}>
<button style={s.backBtn} onClick={() => setViewMode('nhanvien')}>
<ArrowLeft size={16} /> Danh sách nhân viên
</button>
<button
style={s.btnOutline}
onClick={() => {
loadLichSuHomNay();
setViewMode('lichsu');
}} >
<List size={15} /> Lịch sử hôm nay
</button>
</div>

        {/* Thông tin ca */}
        <div style={s.card}>
          <h2 style={s.cardTitle}>Thông tin ca</h2>
          <div style={s.infoGrid}>
            <div>
              <div style={s.infoLabel}>Mã chấm công</div>
              <div style={s.infoValue}>{selectedCa.MaChamCong}</div>
            </div>
            <div>
              <div style={s.infoLabel}>Ca làm việc</div>
              <div style={s.infoValue}>{selectedCa.CaLamViec}</div>
            </div>
            <div>
              <div style={s.infoLabel}>Ngày</div>
              <div style={s.infoValue}>{selectedCa.ThoiGian}</div>
            </div>
          </div>
          <div style={s.statsRow}>
            <span
              style={{ ...s.chip, background: '#e8f5e9', color: '#2e7d32' }}
            >
              <CheckCircle size={13} /> {daCham.length} đã chấm
            </span>
            <span
              style={{ ...s.chip, background: '#fce4ec', color: '#c62828' }}
            >
              <Clock size={13} /> {chuaCham.length} chưa chấm
            </span>
          </div>
        </div>

        {!isToday && (
          <div style={s.warningBanner}>
            <AlertCircle size={16} />
            Ca này thuộc ngày <strong>{selectedCa.ThoiGian}</strong> — không
            phải hôm nay ({todayISO()}). Nút <b>Chấm ra</b> bị khóa.
          </div>
        )}

        {/* Bảng nhân viên với nút chấm ra */}
        <div style={s.card}>
          <h2 style={s.cardTitle}>Danh sách chấm công</h2>
          {loadingDetail ? (
            <div style={s.loadingBox}>Đang tải...</div>
          ) : (
            <table style={s.table}>
              <thead>
                <tr style={s.thead}>
                  {[
                    'Mã NV',
                    'Tên NV',
                    'Trạng thái',
                    'Giờ vào',
                    'Giờ ra',
                    'Hành động',
                  ].map((h) => (
                    <th key={h} style={s.th}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {chiTiet.map((nv) => {
                  const daNhanVao = !!nv.GioVao;
                  const daNhanRa = !!nv.GioRa;
                  return (
                    <tr key={`${nv.MaNV}-${nv.MaChiTiet}`} style={s.tr}>
                      <td style={s.td}>{nv.MaNV}</td>
                      <td style={{ ...s.td, fontWeight: 500 }}>
                        {nv.HoTen ?? nv.MaNV}
                      </td>
                      <td style={s.td}>
                        {daNhanVao ? (
                          <span style={s.badgeGreen}>● Đã chấm</span>
                        ) : (
                          <span style={s.badgeRed}>● Chưa chấm</span>
                        )}
                      </td>
                      <td style={s.td}>{nv.GioVao ?? '—'}</td>
                      <td style={s.td}>{nv.GioRa ?? '—'}</td>
                      <td style={s.td}>
                        {daNhanVao && daNhanRa ? (
                          <span style={s.actionDone}>Hoàn thành</span>
                        ) : daNhanVao && !daNhanRa ? (
                          <button
                            style={isToday ? s.btnChamRa : s.btnChamRaDisabled}
                            onClick={() => handleChamRa(nv.MaNV)}
                            title={
                              !isToday
                                ? `Ca thuộc ngày ${selectedCa.ThoiGian}, không thể chấm ra`
                                : ''
                            }
                          >
                            <LogOut size={14} />
                            {isToday ? 'Chấm ra' : 'Chấm ra (khóa)'}
                          </button>
                        ) : (
                          <span style={s.actionDone}>Chưa chấm vào</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {chiTiet.length === 0 && (
                  <tr>
                    <td colSpan={6} style={s.emptyCell}>
                      Không có nhân viên trong ca này
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );

}

// ========================= VIEW: LỊCH SỬ CHẤM CÔNG HÔM NAY =========================
if (viewMode === 'lichsu') {
return (
<div style={s.page}>
{toast && <Toast msg={toast.msg} type={toast.type} />}
<button
style={s.backBtn}
onClick={() => setViewMode(selectedCa ? 'detail' : 'list')} >
<ArrowLeft size={16} /> Quay lại
</button>

        <div style={s.toolbar}>
          <h1 style={s.pageTitle}>Lịch sử chấm công hôm nay — {todayISO()}</h1>
        </div>

        <div style={s.card}>
          {loadingLichSu ? (
            <div style={s.loadingBox}>Đang tải...</div>
          ) : (
            <table style={s.table}>
              <thead>
                <tr style={s.thead}>
                  {[
                    'Mã CC',
                    'Ca',
                    'Mã NV',
                    'Tên NV',
                    'Giờ vào',
                    'Giờ ra',
                    'Trạng thái',
                  ].map((h) => (
                    <th key={h} style={s.th}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lichSuHomNay.map((nv, i) => {
                  const done = !!nv.GioVao && !!nv.GioRa;
                  const inProgress = !!nv.GioVao && !nv.GioRa;
                  return (
                    <tr key={i} style={s.tr}>
                      <td style={s.td}>{nv.MaChamCong}</td>
                      <td style={s.td}>{(nv as any)._tenCa ?? '—'}</td>
                      <td style={s.td}>{nv.MaNV}</td>
                      <td style={{ ...s.td, fontWeight: 500 }}>
                        {nv.HoTen ?? nv.MaNV}
                      </td>
                      <td style={s.td}>{nv.GioVao ?? '—'}</td>
                      <td style={s.td}>{nv.GioRa ?? '—'}</td>
                      <td style={s.td}>
                        {done ? (
                          <span style={s.badgeGreen}>Hoàn thành</span>
                        ) : inProgress ? (
                          <span
                            style={{
                              ...s.chip,
                              background: '#fff3e0',
                              color: '#e65100',
                            }}
                          >
                            Đang làm
                          </span>
                        ) : (
                          <span style={s.badgeRed}>Chưa chấm</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {lichSuHomNay.length === 0 && (
                  <tr>
                    <td colSpan={7} style={s.emptyCell}>
                      Chưa có dữ liệu chấm công hôm nay
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );

}

// ========================= VIEW: DANH SÁCH CA =========================
return (
<div style={s.page}>
{toast && <Toast msg={toast.msg} type={toast.type} />}
<div style={s.toolbar}>
<h1 style={s.pageTitle}>Tạo ca chấm công</h1>
<div style={{ display: 'flex', gap: 10 }}>
<button
style={s.btnOutline}
onClick={() => {
loadLichSuHomNay();
setViewMode('lichsu');
}} >
<List size={15} /> Lịch sử hôm nay
</button>
<button style={s.btnPrimary} onClick={openCreate}>
<Plus size={16} /> Tạo ca mới
</button>
</div>
</div>

      <input
        style={s.searchInput}
        placeholder="Tìm kiếm ca chấm công..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div style={s.card}>
        <table style={s.table}>
          <thead>
            <tr style={s.thead}>
              {['Mã CC', 'Ca làm việc', 'Thời gian', 'Hành động'].map((h) => (
                <th key={h} style={s.th}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((ca) => (
              <tr
                key={ca.MaChamCong}
                style={{ ...s.tr, cursor: 'pointer' }}
                onClick={() => openNhanVien(ca)}
              >
                <td style={s.td}>{ca.MaChamCong}</td>
                <td style={{ ...s.td, fontWeight: 500 }}>{ca.CaLamViec}</td>
                <td style={{ ...s.td, color: '#888' }}>{ca.ThoiGian}</td>
                <td style={s.td} onClick={(e) => e.stopPropagation()}>
                  <button
                    style={s.iconBtn}
                    title="Chỉnh sửa"
                    onClick={(e) => openEdit(ca, e)}
                  >
                    <Pencil size={16} color="#1976d2" />
                  </button>
                  <button
                    style={s.iconBtn}
                    title="Xóa"
                    onClick={(e) => handleDelete(ca.MaChamCong, e)}
                  >
                    <Trash2 size={16} color="#d32f2f" />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} style={s.emptyCell}>
                  Không có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ============ MODAL TẠO / SỬA CA ============ */}
      {showForm && (
        <div style={s.overlay}>
          <form style={s.modal} onSubmit={handleSubmit}>
            <h2 style={s.modalTitle}>
              {isEdit ? 'Chỉnh sửa ca' : 'Tạo ca mới'}
            </h2>
            <div style={s.formGroup}>
              <label style={s.label}>Ca làm việc</label>
              <select
                style={s.select}
                value={formCa}
                onChange={(e) => setFormCa(e.target.value)}
                required
              >
                {CA_OPTIONS.map((ca) => (
                  <option key={ca} value={ca}>
                    {ca}
                  </option>
                ))}
              </select>
            </div>
            <div style={s.formGroup}>
              <label style={s.label}>Thời gian</label>
              <input
                style={{
                  ...s.input,
                  background: '#f7f8fc',
                  color: '#888',
                  cursor: 'not-allowed',
                }}
                value={todayISO()}
                readOnly
              />
              <span
                style={{
                  fontSize: '11px',
                  color: '#9aa3b5',
                  marginTop: '4px',
                  display: 'block',
                }}
              >
                Tự động lấy ngày hiện tại
              </span>
            </div>
            <div style={s.modalActions}>
              <button type="submit" style={s.btnPrimary}>
                {isEdit ? 'Cập nhật' : 'Tạo ca'}
              </button>
              <button
                type="button"
                style={s.btnCancel}
                onClick={() => setShowForm(false)}
              >
                Đóng
              </button>
            </div>
          </form>
        </div>
      )}
    </div>

);
}

// ========================= TOAST =========================
function Toast({ msg, type }: { msg: string; type: 'ok' | 'err' }) {
return (
<div
style={{
        position: 'fixed',
        top: 24,
        right: 24,
        zIndex: 999,
        background: type === 'ok' ? '#1b5e20' : '#b71c1c',
        color: '#fff',
        padding: '12px 20px',
        borderRadius: '10px',
        fontSize: '14px',
        fontWeight: 500,
        boxShadow: '0 4px 20px rgba(0,0,0,0.22)',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        maxWidth: 400,
      }} >
{type === 'ok' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
{msg}
</div>
);
}

// ========================= STYLES =========================
const s: Record<string, React.CSSProperties> = {
page: {
padding: '28px 32px',
background: '#f4f6fb',
minHeight: '100vh',
fontFamily: 'system-ui, sans-serif',
},
toolbar: {
display: 'flex',
justifyContent: 'space-between',
alignItems: 'center',
marginBottom: '16px',
},
detailNavRow: {
display: 'flex',
justifyContent: 'space-between',
alignItems: 'center',
marginBottom: '20px',
},
pageTitle: { fontSize: '22px', fontWeight: 700, color: '#1a2340', margin: 0 },
searchInput: {
display: 'block',
width: '100%',
maxWidth: '360px',
padding: '9px 14px',
borderRadius: '8px',
border: '1px solid #dde3ee',
fontSize: '14px',
background: '#fff',
marginBottom: '18px',
outline: 'none',
},
card: {
background: '#fff',
borderRadius: '14px',
boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
padding: '24px',
marginBottom: '24px',
},
cardTitle: {
fontSize: '17px',
fontWeight: 700,
color: '#1a2340',
marginTop: 0,
marginBottom: '20px',
},
caHeader: {
display: 'flex',
justifyContent: 'space-between',
alignItems: 'flex-start',
background: '#fff',
borderRadius: '14px',
boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
padding: '20px 24px',
marginBottom: '16px',
},
caLabel: {
fontSize: '11px',
color: '#9aa3b5',
letterSpacing: '0.8px',
textTransform: 'uppercase',
marginBottom: 4,
},
caName: { fontSize: '20px', fontWeight: 700, color: '#1a2340' },
caDate: { fontSize: '14px', color: '#888', marginTop: 2 },
warningBanner: {
display: 'flex',
alignItems: 'center',
gap: 8,
background: '#fff8e1',
border: '1px solid #ffe082',
color: '#7a5800',
borderRadius: '10px',
padding: '12px 18px',
fontSize: '13px',
marginBottom: '16px',
},
infoGrid: {
display: 'grid',
gridTemplateColumns: 'repeat(3,1fr)',
gap: '16px',
marginBottom: '20px',
},
infoLabel: {
fontSize: '12px',
color: '#9aa3b5',
marginBottom: '4px',
textTransform: 'uppercase',
letterSpacing: '0.5px',
},
infoValue: { fontSize: '16px', fontWeight: 600, color: '#1a2340' },
statsRow: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
chip: {
display: 'inline-flex',
alignItems: 'center',
gap: '5px',
padding: '4px 12px',
borderRadius: '20px',
fontSize: '13px',
fontWeight: 500,
},
table: { width: '100%', borderCollapse: 'collapse' },
thead: { background: '#f7f8fc' },
th: {
padding: '12px 16px',
textAlign: 'left' as const,
fontSize: '13px',
fontWeight: 600,
color: '#4a5568',
borderBottom: '1px solid #edf0f7',
},
tr: { borderBottom: '1px solid #f0f2f8' },
td: {
padding: '14px 16px',
fontSize: '14px',
color: '#2d3748',
verticalAlign: 'middle',
},
emptyCell: {
padding: '32px',
textAlign: 'center' as const,
color: '#bbb',
fontSize: '14px',
},
loadingBox: { padding: '32px', textAlign: 'center' as const, color: '#aaa' },
badgeGreen: {
background: '#e8f5e9',
color: '#2e7d32',
padding: '4px 10px',
borderRadius: '20px',
fontSize: '12px',
fontWeight: 500,
},
badgeRed: {
background: '#fce4ec',
color: '#c62828',
padding: '4px 10px',
borderRadius: '20px',
fontSize: '12px',
fontWeight: 500,
},
actionDone: { color: '#9aa3b5', fontSize: '13px' },
btnChamCong: {
display: 'inline-flex',
alignItems: 'center',
gap: '6px',
background: '#1565c0',
color: '#fff',
border: 'none',
borderRadius: '8px',
padding: '7px 14px',
fontSize: '13px',
fontWeight: 500,
cursor: 'pointer',
},
btnChamRa: {
display: 'inline-flex',
alignItems: 'center',
gap: '6px',
background: '#e53935',
color: '#fff',
border: 'none',
borderRadius: '8px',
padding: '7px 14px',
fontSize: '13px',
fontWeight: 500,
cursor: 'pointer',
},
btnChamRaDisabled: {
display: 'inline-flex',
alignItems: 'center',
gap: '6px',
background: '#bdbdbd',
color: '#fff',
border: 'none',
borderRadius: '8px',
padding: '7px 14px',
fontSize: '13px',
fontWeight: 500,
cursor: 'not-allowed',
opacity: 0.7,
},
iconBtn: {
background: 'none',
border: 'none',
cursor: 'pointer',
padding: '6px',
borderRadius: '6px',
marginRight: '2px',
},
btnPrimary: {
display: 'inline-flex',
alignItems: 'center',
gap: '7px',
background: '#1565c0',
color: '#fff',
border: 'none',
borderRadius: '9px',
padding: '10px 20px',
fontSize: '14px',
fontWeight: 600,
cursor: 'pointer',
},
btnOutline: {
display: 'inline-flex',
alignItems: 'center',
gap: '7px',
background: '#fff',
color: '#1565c0',
border: '1.5px solid #1565c0',
borderRadius: '9px',
padding: '9px 18px',
fontSize: '14px',
fontWeight: 600,
cursor: 'pointer',
},
backBtn: {
display: 'inline-flex',
alignItems: 'center',
gap: '6px',
background: 'none',
border: 'none',
color: '#1565c0',
fontSize: '15px',
fontWeight: 600,
cursor: 'pointer',
marginBottom: '20px',
padding: 0,
},
overlay: {
position: 'fixed',
inset: 0,
background: 'rgba(0,0,0,0.35)',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
zIndex: 100,
},
modal: {
background: '#fff',
borderRadius: '16px',
padding: '32px',
width: '400px',
boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
},
modalTitle: {
fontSize: '18px',
fontWeight: 700,
color: '#1a2340',
margin: '0 0 24px',
},
formGroup: { marginBottom: '18px' },
label: {
display: 'block',
fontSize: '13px',
fontWeight: 600,
color: '#4a5568',
marginBottom: '6px',
},
select: {
width: '100%',
padding: '10px 12px',
borderRadius: '8px',
border: '1px solid #dde3ee',
fontSize: '14px',
outline: 'none',
background: '#fff',
cursor: 'pointer',
boxSizing: 'border-box' as const,
},
input: {
width: '100%',
padding: '10px 12px',
borderRadius: '8px',
border: '1px solid #dde3ee',
fontSize: '14px',
outline: 'none',
boxSizing: 'border-box' as const,
},
modalActions: {
display: 'flex',
gap: '12px',
justifyContent: 'flex-end',
marginTop: '24px',
},
btnCancel: {
background: '#f0f2f8',
color: '#4a5568',
border: 'none',
borderRadius: '9px',
padding: '10px 20px',
fontSize: '14px',
fontWeight: 500,
cursor: 'pointer',
},
};
