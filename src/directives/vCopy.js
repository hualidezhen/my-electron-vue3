
export default {
    mounted(el, binding) {
        el.addEventListener('click', () => {
            const text = binding.value || el.innerText;
            navigator.clipboard.writeText(text)
                .then(() => {
                    // createMessage.success('文本已复制到剪贴板');
                    useNotification({ title: '通知', content: '文本已复制到剪贴板', icon: 'info' });
                })
                .catch(err => {
                    // createMessage.error('复制文本失败');
                    useNotification({ title: '通知', content: '复制文本失败', icon: 'info' });
                });
        });
    }
};

