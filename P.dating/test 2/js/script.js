// Hàm đăng ký người dùng mới
function register() {
    var username = document.getElementById('registerUsername').value;
    var password = document.getElementById('registerPassword').value;

    // Kiểm tra nếu tên đăng nhập hoặc mật khẩu trống
    if (username === "" || password === "") {
        alert("Please enter a username and password.");
        return;
    }

    var users = JSON.parse(localStorage.getItem('users')) || [];
    var userExists = users.some(function(user) {
        return user.username === username;
    });

    // Kiểm tra nếu tên đăng nhập đã tồn tại
    if (userExists) {
        alert("Username already exists. Please choose another one.");
    } else {
        users.push({ username: username, password: password });
        localStorage.setItem('users', JSON.stringify(users));
        alert("Registration successful! You can now log in.");
    }
}

// Hàm đăng nhập người dùng
function login() {
    var username = document.getElementById('loginUsername').value;
    var password = document.getElementById('loginPassword').value;

    var users = JSON.parse(localStorage.getItem('users')) || [];
    var user = users.find(function(user) {
        return user.username === username && user.password === password;
    });

    // Kiểm tra nếu tên đăng nhập và mật khẩu hợp lệ
    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        localStorage.setItem('loggedInUserName', user.username);
        window.location.href = "home.html";
    } else {
        alert("Invalid username or password.");
    }
}

// Hàm đăng xuất người dùng
function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = "index.html";
}

// Chuyển tới trang cài đặt
function goToSettings() {
    window.location.href = "settings.html";
}

// Chuyển tới trang tin nhắn
function goToMessages() {
    window.location.href = "messages.html";
}

// Chuyển tới trang tìm kiếm
function goToSearch() {
    window.location.href = "search.html";
}

// Thay đổi ảnh đại diện người dùng
function changeProfilePicture() {
    var file = document.getElementById('profilePicture').files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        document.getElementById('profilePicturePreview').src = reader.result;
    };
    if (file) {
        reader.readAsDataURL(file);
    } else {
        document.getElementById('profilePicturePreview').src = "images/default-avatar.png";
    }
}

// Lưu ảnh đại diện người dùng
function saveProfilePicture() {
    var file = document.getElementById('profilePicture').files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        localStorage.setItem('profilePicture', reader.result);
        document.getElementById('userAvatar').src = reader.result; // Cập nhật ảnh đại diện trên trang chủ
        alert("Profile picture updated successfully!");
    };
    if (file) {
        reader.readAsDataURL(file);
    } else {
        alert("Please select a profile picture to upload.");
    }
}

// Chuyển tới trang hồ sơ cá nhân
function goToProfile() {
    window.location.href = "profile.html";
}

// Chuyển tới trang chủ
function goToHome() {
    window.location.href = "home.html";
}

// Tải trang và thiết lập thông tin người dùng
window.onload = function() {
    var profilePicture = localStorage.getItem('profilePicture');
    if (profilePicture) {
        document.getElementById('userAvatar').src = profilePicture;
        var profileAvatar = document.getElementById('profileAvatar');
        if (profileAvatar) {
            profileAvatar.src = profilePicture;
        }
    }
    var storedUsername = localStorage.getItem('loggedInUserName');
    if (storedUsername) {
        document.getElementById('loggedInUserName').textContent = storedUsername;
        var profileUsername = document.getElementById('profileUsername');
        if (profileUsername) {
            profileUsername.textContent = storedUsername;
        }
    }

    var userPosts = JSON.parse(localStorage.getItem('userPosts')) || [];
    var userPostsContainer = document.getElementById('userPosts');
    if (userPostsContainer) {
        userPostsContainer.innerHTML = '';
        userPosts.forEach(function(post) {
            var postDiv = document.createElement('div');
            postDiv.classList.add('post');
            if (post.image) {
                var img = document.createElement('img');
                img.src = post.image;
                img.style.width = '100%';
                postDiv.appendChild(img);
            }
            var content = document.createElement('p');
            content.textContent = post.content;
            content.style.textAlign = 'left'; // Căn lề trái cho văn bản bài viết
            postDiv.appendChild(content);
            userPostsContainer.appendChild(postDiv);
        });
    }
}

// Thêm bài viết mới
function addPost() {
    var postContent = document.getElementById('postContent').value;
    var postImage = document.getElementById('postImage').files[0];
    var postsContainer = document.getElementById('posts');

    // Kiểm tra nếu nội dung bài viết hoặc ảnh không trống
    if (postContent.trim() !== "" || postImage) {
        var postDiv = document.createElement('div');
        postDiv.classList.add('post');

        if (postImage) {
            var reader = new FileReader();
            reader.onloadend = function () {
                var img = document.createElement('img');
                img.src = reader.result;
                img.style.width = '100%';
                postDiv.appendChild(img);

                savePost(postContent, reader.result);

                var content = document.createElement('p');
                content.textContent = postContent;
                content.style.textAlign = 'left'; // Căn lề trái cho văn bản bài viết
                postDiv.appendChild(content);

                postsContainer.insertBefore(postDiv, postsContainer.firstChild);
            };
            reader.readAsDataURL(postImage);
        } else {
            savePost(postContent, null);

            var content = document.createElement('p');
            content.textContent = postContent;
            content.style.textAlign = 'left'; // Căn lề trái cho văn bản bài viết
            postDiv.appendChild(content);

            postsContainer.insertBefore(postDiv, postsContainer.firstChild);
        }

        document.getElementById('postContent').value = "";
        document.getElementById('postImage').value = "";
        document.getElementById('postImagePreview').style.display = "none";
    } else {
        alert("Please write something or select an image to post.");
    }
}

// Lưu bài viết vào localStorage
function savePost(content, image) {
    var userPosts = JSON.parse(localStorage.getItem('userPosts')) || [];
    userPosts.push({ content: content, image: image });
    localStorage.setItem('userPosts', JSON.stringify(userPosts));
}

// Xem trước ảnh bài viết
function previewImage(event) {
    var postImagePreview = document.getElementById('postImagePreview');
    postImagePreview.style.display = "block";
    postImagePreview.src = URL.createObjectURL(event.target.files[0]);
}

// Tìm kiếm người dùng
function searchUser() {
    var query = document.getElementById('searchQuery').value.toLowerCase();
    var users = JSON.parse(localStorage.getItem('users')) || [];
    var searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';

    var results = users.filter(function(user) {
        return user.username.toLowerCase().includes(query);
    });

    if (results.length > 0) {
        results.forEach(function(user) {
            var resultDiv = document.createElement('div');
            resultDiv.classList.add('search-result');
            resultDiv.textContent = user.username;
            searchResults.appendChild(resultDiv);
        });
    } else {
        searchResults.textContent = 'No users found';
    }
}

// Đặt lại mật khẩu
function resetPassword() {
    var username = document.getElementById('resetUsername').value;
    var users = JSON.parse(localStorage.getItem('users')) || [];
    var user = users.find(function(user) {
        return user.username === username;
    });

    if (user) {
        var newPassword = prompt("Enter your new password:");
        if (newPassword) {
            user.password = newPassword;
            localStorage.setItem('users', JSON.stringify(users));
            alert("Password reset successfully!");
        }
    } else {
        alert("User not found.");
    }
}

// Thay đổi mật khẩu
function changePassword() {
    var newPassword = document.getElementById('newPassword').value;
    if (newPassword === "") {
        alert("Please enter a new password.");
        return;
    }

    var loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    var users = JSON.parse(localStorage.getItem('users')) || [];

    var userIndex = users.findIndex(function(user) {
        return user.username === loggedInUser.username;
    });

    if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        localStorage.setItem('users', JSON.stringify(users));
        alert("Password changed successfully!");
    } else {
        alert("User not found.");
    }
}

// Gửi tin nhắn
function sendMessage() {
    var messageContent = document.getElementById('messageContent').value;
    if (messageContent.trim() !== "") {
        var messagesContainer = document.querySelector('.message-list');

        var messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.textContent = messageContent;

        messagesContainer.appendChild(messageDiv);

        document.getElementById('messageContent').value = "";
    } else {
        alert("Please write a message before sending.");
    }
}
function previewImage(event) {
    var postImagePreview = document.getElementById('postImagePreview');
    postImagePreview.style.display = "block";
    postImagePreview.src = URL.createObjectURL(event.target.files[0]);
}
