document.addEventListener('DOMContentLoaded', function() {
    // Xử lý form đăng nhập
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Ngăn chặn form gửi dữ liệu mặc định

            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;

            // Kiểm tra thông tin đăng nhập
            if (localStorage.getItem(username) === password) {
                alert('Login successful!');
                localStorage.setItem('loggedInUser', username); // Lưu thông tin người dùng đăng nhập
                window.location.href = 'profile.html'; // Chuyển hướng tới trang hồ sơ
            } else {
                alert('Incorrect username or password');
            }
        });
    }

    // Xử lý form đăng ký
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Ngăn chặn form gửi dữ liệu mặc định

            const username = document.getElementById('register-username').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;

            if (password !== confirmPassword) {
                alert("Passwords don't match");
                return;
            }

            // Lưu thông tin người dùng mới
            localStorage.setItem(username, password);
            alert('Registration successful!');
            window.location.href = 'login.html'; // Chuyển hướng tới trang đăng nhập
        });
    }

    // Xử lý trang hồ sơ
    const profileUsername = document.getElementById('profile-username');
    if (profileUsername) {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            profileUsername.textContent = loggedInUser;

            const profilePic = document.getElementById('profile-pic');
            const storedAvatar = localStorage.getItem(`${loggedInUser}_avatar`);
            if (storedAvatar) {
                profilePic.src = storedAvatar; // Hiển thị ảnh đại diện đã lưu
            }

            // Xử lý cập nhật ảnh đại diện
            document.getElementById('avatar').addEventListener('change', function(event) {
                const file = event.target.files[0];
                const reader = new FileReader();
                
                // Khi ảnh được chọn
                reader.onload = function(e) {
                    profilePic.src = e.target.result; // Hiển thị ảnh đại diện mới
                    localStorage.setItem(`${loggedInUser}_avatar`, e.target.result); // Lưu ảnh đại diện mới

                    // Giới hạn kích thước ảnh trong khung tròn
                    profilePic.style.width = '150px';
                    profilePic.style.height = '150px';
                    profilePic.style.borderRadius = '50%';
                    profilePic.style.objectFit = 'cover'; // Đảm bảo ảnh phù hợp với khung tròn
                };
                reader.readAsDataURL(file); // Đọc ảnh dưới dạng URL
            });
        } else {
            alert('You are not logged in');
            window.location.href = 'login.html'; // Chuyển hướng tới trang đăng nhập nếu chưa đăng nhập
        }
    }

    // Xử lý trang cài đặt
    const settingsForm = document.getElementById('settings-form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Ngăn chặn form gửi dữ liệu mặc định

            const newAvatar = document.getElementById('new-avatar').files[0];
            const reader = new FileReader();
            reader.onload = function(e) {
                const loggedInUser = localStorage.getItem('loggedInUser');
                localStorage.setItem(`${loggedInUser}_avatar`, e.target.result); // Cập nhật và lưu ảnh đại diện mới
                alert('Profile picture updated!');

                // Hiển thị ảnh đại diện mới
                const profilePic = document.getElementById('profile-pic');
                profilePic.src = e.target.result;

                // Giới hạn kích thước ảnh trong khung tròn
                profilePic.style.width = '150px';
                profilePic.style.height = '150px';
                profilePic.style.borderRadius = '50%';
                profilePic.style.objectFit = 'cover'; // Đảm bảo ảnh phù hợp với khung tròn
            };
            reader.readAsDataURL(newAvatar);
        });
    }

    // Xử lý trang matches
    const matchesList = document.getElementById('matches-list');
    if (matchesList) {
        // Hiển thị danh sách matches mẫu
        const matches = ['User1', 'User2', 'User3'];
        matches.forEach(function(match) {
            const listItem = document.createElement('li');
            listItem.textContent = match;
            matchesList.appendChild(listItem); // Thêm mỗi match vào danh sách
        });
    }
});
const chatButton = document.querySelector('.chat-button');
chatButton.addEventListener('click', function() {
    // Xử lý hành động khi người dùng click vào nút chat
    // Ví dụ: Mở cửa sổ chat hoặc chuyển hướng đến trang chat
    // Điều này cần phải được triển khai thêm tùy theo yêu cầu của bạn.
    console.log("Clicked on chat button");
});


