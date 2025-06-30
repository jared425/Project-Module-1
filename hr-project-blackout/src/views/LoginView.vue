<template>
  <div class="login-container">
    <div class="login-box">
      <img
        src="../assets/pic.png"
        alt="Modern Tech Solutions Logo"
        class="logo"
      />
      <h2>Welcome to Modern Tech Solutions</h2>
      <form @submit.prevent="handleLogin">
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">Log In</button>
        <div class="extra-links">
          <a href="#" @click.prevent="handleForgotPassword">Forgot Password?</a>
        </div>
      </form>
      <div class="signup-prompt">
        <p>Don't have an account?
          <a href="#" @click.prevent="handleSignUp">Sign Up</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
      validEmail: "Admin@HR",
      validPassword: "1234"
    };
  },
  methods: {
    handleLogin() {
      if (this.email === this.validEmail && this.password === this.validPassword) {
        // Create a session instead of permanent storage
        sessionStorage.setItem('isAuthenticated', 'true');
        sessionStorage.setItem('authTimestamp', Date.now());
        
        // Redirect to dashboard or intended path
        const redirectPath = this.$route.query.redirect || '/dashboard';
        this.$router.push(redirectPath);
      } else {
        alert('Invalid credentials! Please try again.');
        this.password = "";
      }
    },
    handleForgotPassword() {
      alert('A password reset link will be sent to your email if it exists in our system.');
    },
    handleSignUp() {
      alert('Please contact HR to create an account for you.');
    },
    checkAuth() {
      // Check if session is still valid (less than 1 hour old)
      const authTimestamp = sessionStorage.getItem('authTimestamp');
      const oneHour = 3600000; // 1 hour in milliseconds

      if (authTimestamp && (Date.now() - parseInt(authTimestamp) < oneHour)) {
        this.$router.push('/dashboard');
      } else {
        // Clear any existing auth if expired
        sessionStorage.removeItem('isAuthenticated');
        sessionStorage.removeItem('authTimestamp');
      }
    }
  },
  created() {
    this.checkAuth();
  }
};
</script>


<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to right, #d0e8ff, #a6c8ff);
  padding: 20px;
}

.login-box {
  background-color: #ffffff;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
}

.logo {
  width: 90px;
  margin-bottom: 30px;
  border-radius: 9px;
}

h2 {
  color: #333;
  margin-bottom: 30px;
  font-weight: 600;
  font-size: 20px;
}

input {
  width: 100%;
  padding: 12px 14px;
  margin-bottom: 16px;
  border: 1px solid #c6d6f0;
  border-radius: 8px;
  font-size: 16px;
  background-color: #f5faff;
  color: #333;
  transition: border-color 0.3s;
}

input:focus {
  outline: none;
  border-color: #6aaeff;
}

input::placeholder {
  color: #999;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #4d9fff;
  color: white;
  font-size: 16px;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #3585e0;
}

.extra-links {
  margin-top: 10px;
  font-size: 14px;
}

.extra-links a {
  color: #4d9fff;
  text-decoration: none;
}

.extra-links a:hover {
  text-decoration: underline;
}

.signup-prompt {
  margin-top: 20px;
  font-size: 14px;
  color: #666;
}

.signup-prompt a {
  color: #4d9fff;
  text-decoration: none;
}

.signup-prompt a:hover {
  text-decoration: underline;
}
</style>