/**
 * Membuka topik pembelajaran yang dipilih dan menyembunyikan menu utama
 * @param {string} topicId - ID elemen topik ('deskripsi', 'cerpen', atau 'eksposisi')
 */
function openTopic(topicId) {
    // Sembunyikan menu utama
    document.getElementById('main-menu').classList.add('hidden');
    
    // Tampilkan container konten
    const contentDisplay = document.getElementById('content-display');
    contentDisplay.classList.remove('hidden');

    // Sembunyikan semua artikel topik terlebih dahulu
    const allTopics = document.querySelectorAll('.topic-content');
    allTopics.forEach(topic => {
        topic.classList.add('hidden');
    });

    // Tampilkan artikel topik yang dipilih
    const selectedTopic = document.getElementById(topicId);
    if (selectedTopic) {
        selectedTopic.classList.remove('hidden');
    }

    // Gulir ke atas halaman dengan halus
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Menyembunyikan modul pembelajaran dan kembali ke menu utama
 */
function closeTopic() {
    // Sembunyikan container konten
    document.getElementById('content-display').classList.add('hidden');

    // Tampilkan kembali menu utama
    document.getElementById('main-menu').classList.remove('hidden');

    // Gulir ke atas halaman dengan halus
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
