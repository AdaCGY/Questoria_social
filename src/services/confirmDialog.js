import Swal from 'sweetalert2'

// 通用確認對話框
export const confirmDialog = async (options = {}) => {
  const result = await Swal.fire({
    title: options.title || '確認操作',
    text: options.text || '確定要繼續嗎？',
    icon: options.icon || 'warning',
    showCancelButton: true,
    confirmButtonText: options.confirmButtonText || '確定',
    cancelButtonText: options.cancelButtonText || '取消',
    confirmButtonColor: options.confirmButtonColor || '#d33',
    cancelButtonColor: options.cancelButtonColor || '#3085d6',
    reverseButtons: true,
    backdrop: true, 
  })

  return result.isConfirmed
}
