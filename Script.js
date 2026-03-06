// ==========================================
// 1. BIẾN TOÀN CỤC & DỮ LIỆU
// ==========================================
let currentUserName = "";
let currentSongIndex = 0;
let giftInterval;

// Danh sách nhạc
const playlist = [
    {
        title: "Em Đồng Ý (I Do)",
        artist: "Đức Phúc x 911",
        src: "./music/ido.m4a",
        cover: "./assets/music picture/ido.jpg"
    },
    {
        title: "Nàng Thơ",
        artist: "Hoàng Dũng",
        src: "./music/nangtho.m4a",
        cover: "./assets/music picture/nangtho.png"
    },
    {
        title: "Ánh Sao Và Bầu Trời",
        artist: "T.R.I x Cá",
        src: "./music/anhsaovabautroi.m4a",
        cover: "./assets/music picture/anhsaovabautroi.png"
    },
    {
        title: "Thanh Xuân",
        artist: "Da LAB",
        src: "./music/thanhxuan.m4a",
        cover: "./assets/music picture/thanhxuan.jpg"
    },
    {
        title: "Có Em",
        artist: "Madihu, Low G",
        src: "./music/coem.mp3",
        cover: "./assets/music picture/coem.jpg"
    },
    {
        title: "Ngày Đầu Tiên",
        artist: "Đức Phúc",
        src: "./music/ngaydautien.m4a",
        cover: "./assets/music picture/ngaydautien.jpg"
    },
    {
        title: "Double Take",
        artist: "Dhruv Sharma",
        src: "./music/doubletake.mp3",
        cover: "./assets/music picture/doubletake.jpg"
    },
    {
        title: "Until I Found You",
        artist: "Stephen Sanchez",
        src: "./music/untilifoundyou.mp3",
        cover: "./assets/music picture/untilifoundyou.jpg"
    },
    {
        title: "Best Part",
        artist: "Daniel Caesar, H.E.R",
        src: "./music/bestpart.mp3",
        cover: "./assets/music picture/bestpart.jpg"
    }
];

// Danh sách chữ bay
const floatMessages = [
    "Xin lỗi anh vẽ không có được đẹp  🥲🥹",
    "8/3 vui vẻ nhé",
    "Mãi tươi cười và xinh đẹp nhé",
    "Hehe",
    "Đừng thức khuya nữa nha hại sức khỏe lắm",
    "Nhiều chuyện số 1 Việt Nam",
    "Luyên thuyên đủ thứ trên đời",
    "Không có quà đâu đừng có mong chờ",
    "Nào 10 toán thì có quà nhé",
    "Chúc mừng bạn nhận được 1 voucher 8/3: anh Trung nhắm mắt đánh cờ với bạn",
    "Tặng 1 voucher 8/3: anh Trung chấp bạn 1 con xe",
    "Chấp 1 hậu vẫn win bình thường",
    "Hoa này là hoa code ngửi thử đi xem có mùi cafe với deadline không",
    "Cánh bảo ⚠️ Web này có chứa virus được 10 toán lý hóa sinh sử địa",
    "Mất ngủ vì không có đối thủ",
    "Quá đz 😎",
    "Tày rồi",
    "Bó tay, đi học bài đi",
    "+1 cú lừa ngày 8/3",
    "Chủ web quá giỏi",
    "Bớt tẽn tẽn lại",
    "Cười nhiều lên vì cuộc đời cho phép",
    "Nhạc chill vcl",
    "Thi rớt thì thi lại thôi đời còn dài ~~"
];

// Kết nối với các thẻ HTML
const audio = document.getElementById("audio-player");
const playBtn = document.getElementById("play-btn");
const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");
const cdThumb = document.getElementById("cd-thumb");
const playerContainer = document.querySelector(".music-player");


// ==========================================
// 2. LOGIC ĐĂNG NHẬP
// ==========================================
function checkLogin() {
    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value;
    const errorMsg = document.getElementById("error-msg");

    // Ẩn lỗi cũ mỗi khi bắt đầu nhấn nút để kiểm tra lại
    errorMsg.style.display = "none";

    if (user === "") {
        errorMsg.textContent = "Bạn chưa nhập tên kìa!";
        errorMsg.style.display = "block";
        return;
    }

    if (pass === "0803") {
        currentUserName = user;
        document.getElementById("login-screen").style.display = "none";
        document.getElementById("main-menu").style.display = "flex";
        startFallingPetals();
        // Phát nhạc
        audio.play();
        playBtn.textContent = "⏸";
        playerContainer.classList.add("playing");
    } else {
        // Chỉ hiện lỗi khi mật khẩu sai
        errorMsg.innerHTML = "Mật khẩu chưa đúng rồi, thử lại nhé!<br><span style='font-size: 0.85rem; color: #ff69b4; font-weight: bold;'>(Gợi ý 💡: Ngày lễ của một nửa thế giới gồm 4 số nha!)</span>";
        errorMsg.style.display = "block";
    }
}

// Bấm Enter để đăng nhập nhanh
document.getElementById("password").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        checkLogin();
    }
});


// ==========================================
// 3. LOGIC ÂM NHẠC (MUSIC PLAYER VÀ PLAYLIST)
// ==========================================
const playlistContainer = document.getElementById("playlist-container");

function loadSong(index) {
    const song = playlist[index];
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    audio.src = song.src;
    cdThumb.style.backgroundImage = `url('${song.cover}')`;

    // Cập nhật giao diện: Đánh dấu bài đang phát trong list
    updateActiveSong();
}

function togglePlay() {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = "⏸";
        playerContainer.classList.add("playing");
    } else {
        audio.pause();
        playBtn.textContent = "▶";
        playerContainer.classList.remove("playing");
    }
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    if (!audio.paused || playerContainer.classList.contains("playing")) {
        audio.play();
    }
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentSongIndex);
    if (!audio.paused || playerContainer.classList.contains("playing")) {
        audio.play();
    }
}

// Bấm vào bài nào trong list thì phát bài đó
function playSongAtIndex(index) {
    currentSongIndex = index;
    loadSong(currentSongIndex);
    audio.play();
    playBtn.textContent = "⏸";
    playerContainer.classList.add("playing");
}

// Hàm vẽ danh sách bài hát ra màn hình
function renderPlaylist() {
    playlistContainer.innerHTML = "";
    playlist.forEach((song, index) => {
        const item = document.createElement("div");
        item.className = "playlist-item";

        // Sự kiện click để phát nhạc
        item.onclick = () => playSongAtIndex(index);

        item.innerHTML = `
            <div class="song-thumb" style="background-image: url('${song.cover}')"></div>
            <div class="song-info">
                <h4>${song.title}</h4>
                <p>${song.artist}</p>
            </div>
        `;
        playlistContainer.appendChild(item);
    });
}

// Hàm làm nổi bật bài hát đang được chọn
function updateActiveSong() {
    if (!playlistContainer) return;
    const items = playlistContainer.querySelectorAll('.playlist-item');
    items.forEach((item, index) => {
        if (index === currentSongIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Tự động nạp bài hát đầu tiên, vẽ list và chuyển bài khi hát xong
renderPlaylist();
loadSong(currentSongIndex);
audio.addEventListener("ended", nextSong);

// ==========================================
// 4. LOGIC MỞ/ĐÓNG HỘP THOẠI & HOA NỞ
// ==========================================
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';

    if (modalId === 'giftModal') {
        startFlowerAnimation();
    }
    if (modalId === 'letterModal') {
        startTyping();
    }
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';

    if (modalId === 'giftModal') {
        clearInterval(giftInterval);
        document.getElementById('css-rose-wrapper').classList.remove('bloom');
        document.querySelectorAll('.floating-text').forEach(el => el.remove());
    }
    if (modalId === 'letterModal') {
        clearInterval(typingInterval); // Dừng gõ nếu đóng thư giữa chừng
    }
}

// Bấm ra ngoài nền thì tự động đóng hộp thoại
window.onclick = function (event) {
    const modals = document.getElementsByClassName('modal');
    for (let i = 0; i < modals.length; i++) {
        if (event.target == modals[i]) {
            modals[i].style.display = "none";

            if (modals[i].id === 'giftModal') {
                clearInterval(giftInterval);
                document.getElementById('css-rose-wrapper').classList.remove('bloom');
                document.querySelectorAll('.floating-text').forEach(el => el.remove());
            }
            if (modals[i].id === 'letterModal') {
                clearInterval(typingInterval);
            }
        }
    }
}
function startFlowerAnimation() {
    // Gọi đúng ID mới của khung CSS Rose
    const roseWrapper = document.getElementById('css-rose-wrapper');
    const container = document.getElementById('flower-container');

    // 1. Gắn class cho hoa trượt lên
    setTimeout(() => {
        roseWrapper.classList.add('bloom');
    }, 100);

    // 2. Tạo chữ bay liên tục
    giftInterval = setInterval(() => {
        const textElement = document.createElement('div');
        textElement.className = 'floating-text';
        let randomMsg = floatMessages[Math.floor(Math.random() * floatMessages.length)];
        randomMsg = randomMsg.replace(/bạn/gi, currentUserName);
        textElement.innerText = randomMsg;

        // Random vị trí xuất hiện
        textElement.style.left = (Math.floor(Math.random() * 70) + 10) + '%';
        textElement.style.bottom = '15%';

        container.appendChild(textElement);

        // Dọn rác chống giật lag
        setTimeout(() => {
            textElement.remove();
        }, 4000);
    }, 800);
}

// ==========================================
// 5. LOGIC HIỆU ỨNG GÕ CHỮ (BỨC THƯ)
// ==========================================

let typingInterval; 

function startTyping() {
    const greeting = document.getElementById("letter-greeting");
    const textElement = document.getElementById("typewriter-text");

    // 1. Chào tên ở tiêu đề
    greeting.innerText = `⚠️Cảnh báo hệ thống⚠️ \n\n Gửi ${currentUserName}, `;

    // 2. NỘI DUNG THƯ TỰ ĐỘNG CHÈN TÊN 
    const letterContent = `Nhà ngươi trông đợi điều gì ở trong này? Thấy cái giao diện hồng hồng rồi hoa rơi lả tả, lại còn văng vẳng tình ca đúng không? Hahaha nhưng mà xin lỗi nhé ${currentUserName} cú lừa cả đấy! \nThôi thì dù sao nhà người cũng đã cất công vào tận đây rồi nên là trẫm cũng nói lun \n ... \nLà cái story bữa là anh code cái web này đó hihi, cho nên là... \nNhân dịp 8/3, thay vì chúc mấy câu văn mẫu nhạt nhẽo, anh code cho em hẳn cái web (anh cũng không biết dùng để làm gì nhưng mà vui và khá dễ thương) chắc một là để test trình của mình (trình nhờ Gemini code hộ) hai là cũng sẵn tiện khịa cô một tí cho giảm bớt áp lực thi cử hehe.\nVậy nên là ... \n..............\nChúc ${currentUserName} một ngày 8/3 bớt lượn lờ đi chơi lại, bớt báo mọi người xung quanh và cả vụ ăn mỳ trong lớp nữa nha, anh nhắc em. Đặc biệt là, tuần sau kiểm tra giữa kỳ đúng không? Vậy thì anh chúc em 10 toán 10 lý 10 hóa 10 văn 10 sử 10 công nghệ 10 tin 10 gì nữa anh quên rồi mà kệ đi. \nLo mà cày đề đi nhé! Thi xong nào rảnh làm kèo cờ vua với anh. Lần sau không có vụ vừa đánh vừa chỉ đâu hahahaha chuẩn bị tinh thần ăn hành đi hahahaha. \nQuên mất, 8/3 vui vẻ nhé hehe. Giờ thì khám phá hết cái web này xong rồi tắt máy đi ngủ ngay hoặc lấy sách vở ra học bài nhé. Một lần nữa chúc ${currentUserName} 8/3 vui vẻ và tuần sau thi tốt em nhé.\n\n P/S: Nhạc anh chọn cũng chill chill á, khi nào em học bài mở lên nghe là hợp lý luôn. Thích bài nào nữa thì có thể kêu anh add thêm nhen (thầy làm web thầy có lấy đồng bạc nào của các em đâu) và dĩ nhiên là không có quảng cáo =)) \nThân gửi, \nTrân trọng, \nNguyễn Tấn Trungggg 😎 \nFrom Trung Mixi with love  ❤️`;

    // 3. Reset lại bức thư mỗi khi mở ra
    textElement.innerHTML = "";
    clearInterval(typingInterval);
    let i = 0;

    // 4. Chạy hiệu ứng gõ từng chữ
    typingInterval = setInterval(() => {
        if (i < letterContent.length) {
            textElement.innerHTML += letterContent.charAt(i);
            i++;
        } else {
            clearInterval(typingInterval);
        }
    }, 45);
}

// ==========================================
// 6. HIỆU ỨNG MƯA HOA ĐÀO (SAKURA)
// ==========================================
function startFallingPetals() {
    // Cứ mỗi 300ms thả một cánh hoa
    setInterval(() => {
        const petal = document.createElement("div");
        petal.classList.add("petal");

        // Random ra hoa đào hoặc trái tim lấp lánh
        const shapes = ["🌸", "💮", "✨", "💖"];
        petal.innerHTML = shapes[Math.floor(Math.random() * shapes.length)];

        // Vị trí xuất hiện ngẫu nhiên theo chiều ngang
        petal.style.left = Math.random() * 100 + "vw";

        // Thời gian rơi ngẫu nhiên từ 3 đến 6 giây (tạo độ lả tả tự nhiên)
        petal.style.animationDuration = Math.random() * 3 + 3 + "s";

        // Kích thước ngẫu nhiên
        petal.style.fontSize = Math.random() * 10 + 10 + "px";

        document.body.appendChild(petal);

        // Dọn rác sau khi hoa rớt khỏi màn hình để không nặng máy
        setTimeout(() => {
            petal.remove();
        }, 6000);
    }, 300);
}
