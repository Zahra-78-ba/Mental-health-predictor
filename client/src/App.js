import React, { useState } from "react";
import "./App.css";

const questions = [
  { text: "Do you feel stressed often?", emoji: "😰" },
  { text: "Do you feel anxious frequently?", emoji: "😟" },
  { text: "Do you have trouble sleeping?", emoji: "😴" },
  { text: "Do you feel low energy most of the time?", emoji: "😪" },
  { text: "Do you feel overwhelmed easily?", emoji: "😵" }
];

const options = [
  { label: "Yes", emoji: "😟" },
  { label: "Sometimes", emoji: "🙂" },
  { label: "Often", emoji: "😕" },
  { label: "No", emoji: "🙂" }
];

const moods = ["😢", "🙁", "😐", "😄", "🥰"];
const moodLabels = ["Very Sad", "Sad", "Okay", "Good", "Happy"];

function GirlIllustration() {
  return (
    <svg
      viewBox="0 0 500 400"
      className="hero-illustration"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fcd9e7" />
          <stop offset="50%" stopColor="#f4c9d8" />
          <stop offset="100%" stopColor="#d9c3e8" />
        </linearGradient>
        <linearGradient id="mountain1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b79bd1" />
          <stop offset="100%" stopColor="#9b80c0" />
        </linearGradient>
        <linearGradient id="mountain2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8f72b5" />
          <stop offset="100%" stopColor="#765ca0" />
        </linearGradient>
        <linearGradient id="hoodie" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9b87d4" />
          <stop offset="100%" stopColor="#7c63c4" />
        </linearGradient>
      </defs>

      <rect width="500" height="400" fill="url(#sky)" />

      {/* sun */}
      <circle cx="380" cy="90" r="38" fill="#ffe3b3" opacity="0.8" />

      {/* mountains */}
      <path d="M0 260 L120 150 L230 260 Z" fill="url(#mountain2)" opacity="0.85" />
      <path d="M150 270 L300 140 L460 270 Z" fill="url(#mountain1)" opacity="0.9" />
      <path d="M0 290 L100 220 L500 290 L500 400 L0 400 Z" fill="#6b4e9e" opacity="0.55" />

      {/* ground */}
      <ellipse cx="250" cy="370" rx="260" ry="40" fill="#caa9e0" opacity="0.5" />

      {/* girl sitting silhouette */}
      <g transform="translate(250,230)">
        {/* hair back (behind hood) */}
        <ellipse cx="0" cy="20" rx="50" ry="60" fill="#3a2a45" />

        {/* sitting body / hoodie */}
        <path
          d="M -55 60 
             Q -55 0 0 0 
             Q 55 0 55 60
             L 55 140
             Q 55 170 0 170
             Q -55 170 -55 140
             Z"
          fill="url(#hoodie)"
        />

        {/* knees bump */}
        <ellipse cx="0" cy="160" rx="60" ry="22" fill="#5b4a8a" />

        {/* hood */}
        <circle cx="0" cy="0" r="46" fill="url(#hoodie)" />

        {/* face */}
        <circle cx="0" cy="6" r="26" fill="#f3c9a7" />

        {/* hair strands on face */}
        <path
          d="M -26 -10 Q -30 20 -14 40"
          stroke="#3a2a45"
          strokeWidth="9"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 26 -10 Q 30 10 18 26"
          stroke="#3a2a45"
          strokeWidth="9"
          fill="none"
          strokeLinecap="round"
        />

        {/* arms hugging knees */}
        <ellipse cx="-45" cy="120" rx="16" ry="34" fill="url(#hoodie)" />
        <ellipse cx="45" cy="120" rx="16" ry="34" fill="url(#hoodie)" />
      </g>

      {/* flowers */}
      <g fill="#e98fb0">
        <circle cx="60" cy="350" r="6" />
        <circle cx="80" cy="360" r="5" />
        <circle cx="430" cy="355" r="6" />
        <circle cx="410" cy="365" r="5" />
      </g>
    </svg>
  );
}

function LoginCard({ onLogin, registeredUser, onRegister }) {
  const [mode, setMode] = useState(registeredUser ? "login" : "signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
      setError("Please fill email and password to sign up.");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    onRegister({ email, password });
    setError("");
    setMode("login");
    // keep email & password filled for login
  };

  const handleLogin = () => {
    if (!registeredUser) {
      setError("Please sign up first before logging in.");
      setMode("signup");
      return;
    }
    if (email !== registeredUser.email || password !== registeredUser.password) {
      setError("Incorrect email or password.");
      return;
    }
    setError("");
    onLogin();
  };

  return (
    <div className="login-card">
      <div className="avatar">🧠</div>
      <h2 className="welcome-title">
        {mode === "login" ? "Welcome Back 💜" : "Create Account 💜"}
      </h2>
      <p className="welcome-sub">
        {mode === "login"
          ? "Login to continue your mental health journey"
          : "Sign up to start your mental health journey"}
      </p>

      <div className="input-group">
        <span className="input-icon">✉️</span>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input-group">
        <span className="input-icon">🔒</span>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className="input-icon-right">👁️</span>
      </div>

      {mode === "login" && (
        <div className="login-row">
          <label className="remember">
            <input type="checkbox" /> Remember me
          </label>
          <span className="forgot">Forgot password?</span>
        </div>
      )}

      {error && <p className="auth-error">{error}</p>}

      {mode === "login" ? (
        <button
          className={`btn next full ${!registeredUser ? "disabled" : ""}`}
          onClick={handleLogin}
        >
          Login
        </button>
      ) : (
        <button className="btn next full" onClick={handleSignup}>
          Sign Up
        </button>
      )}

      <p className="signup-text">
        {mode === "login" ? (
          <>
            Don't have an account?{" "}
            <span className="signup-link" onClick={() => { setMode("signup"); setError(""); }}>
              Sign up
            </span>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <span className="signup-link" onClick={() => { setMode("login"); setError(""); }}>
              Login
            </span>
          </>
        )}
      </p>
    </div>
  );
}

function HeroSection() {
  return (
    <div className="hero-section">
      <div className="hero-text">
        <h1>Mental Health Predictor</h1>
        <p className="hero-desc">
          Take a step towards understanding your mental well-being.
        </p>

        <div className="feature">
          <span className="feature-icon">🛡️</span>
          <div>
            <strong>Private &amp; Secure</strong>
            <p>Your data is safe with us</p>
          </div>
        </div>
        <div className="feature">
          <span className="feature-icon">✨</span>
          <div>
            <strong>AI-Powered Insights</strong>
            <p>Advanced ML for better prediction</p>
          </div>
        </div>
        <div className="feature">
          <span className="feature-icon">🌸</span>
          <div>
            <strong>Personalized Support</strong>
            <p>Get insights tailored for you</p>
          </div>
        </div>
      </div>

      <div className="hero-art">
        <GirlIllustration />
        <div className="hero-bubble">
          You are not alone.
          <br />
          Your feelings are valid.
          <br />
          Your mental health matters. 💜
        </div>
      </div>
    </div>
  );
}

function QuizCard({
  index,
  current,
  setCurrent,
  goBack,
  nextQuestion
}) {
  const progress = ((index + 1) / questions.length) * 100;
  return (
    <div className="card quiz-card">
      <div className="avatar small">🧠</div>
      <h3 className="title">Mental Health Check</h3>
      <p className="subtitle">
        Question {index + 1} of {questions.length}
      </p>

      <div className="progress-row">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <span className="progress-percent">{Math.round(progress)}%</span>
      </div>

      <div className="mood-emoji">{questions[index].emoji}</div>

      <p className="question">{questions[index].text}</p>
      <p className="note">
        Be honest with yourself. There are no right or wrong answers.
      </p>

      <div className="options">
        {options.map((opt) => (
          <div
            key={opt.label}
            className={`option ${current === opt.label ? "selected" : ""}`}
            onClick={() => setCurrent(opt.label)}
          >
            <span className="option-emoji">{opt.emoji}</span>
            {opt.label}
          </div>
        ))}
      </div>

      <div className="btn-row">
        {index > 0 && (
          <button className="btn back" onClick={goBack}>
            Back
          </button>
        )}
        <button className="btn next" onClick={nextQuestion}>
          {index === questions.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}

function ResultCard({ result, restart }) {
  return (
    <div className="card result-card">
      <div className="result-header">
        <div className="avatar small pink">🧠</div>
        <h3>Your Result 🎉</h3>
      </div>
      <p className="result-risk">{result || "Moderate Risk"}</p>
      <p className="result-desc">
        Your responses indicate that you might be experiencing moderate
        levels of stress or anxiety.
      </p>

      <div className="result-box">
        <p className="result-box-title">⚠️ What This Means</p>
        <p className="result-box-text">
          It's important to take care of yourself and consider healthy
          habits that can improve your mental well-being.
        </p>

        <p className="result-box-title">📋 Recommendations</p>
        <ul className="rec-list">
          <li>✅ Practice deep breathing exercises</li>
          <li>✅ Maintain a healthy sleep routine</li>
          <li>✅ Talk to someone you trust</li>
          <li>✅ Consider meditation or mindfulness</li>
        </ul>
      </div>

      <div className="btn-row">
        <button className="btn back">⬇ Download Report</button>
        <button className="btn next" onClick={restart}>
          Take Again
        </button>
      </div>
    </div>
  );
}

function MoodTracker() {
  const [selected, setSelected] = useState(4);
  const history = [
    { date: "May 25, 2024", risk: "Moderate Risk", color: "#f5a623" },
    { date: "May 20, 2024", risk: "Low Risk", color: "#2ecc71" },
    { date: "May 15, 2024", risk: "High Risk", color: "#e74c3c" }
  ];

  return (
    <div className="card mood-card">
      <h3 className="title left">Mood Tracker</h3>
      <p className="subtitle left">Track your mood daily</p>

      <div className="mood-row">
        {moods.map((m, i) => (
          <div
            key={i}
            className={`mood-item ${selected === i ? "selected" : ""}`}
            onClick={() => setSelected(i)}
          >
            <span className="mood-emoji-small">{m}</span>
            <span className="mood-label">{moodLabels[i]}</span>
          </div>
        ))}
      </div>

      <div className="mood-quote">
        Small steps every day lead to big changes.
        <br />
        You are stronger than you think. 💜
      </div>

      <div className="history-header">
        <span>Recent History</span>
        <span className="view-all">View all</span>
      </div>
      {history.map((h, i) => (
        <div className="history-row" key={i}>
          <span className="history-date">{h.date}</span>
          <span className="history-risk">
            <span
              className="dot"
              style={{ background: h.color }}
            ></span>
            {h.risk}
          </span>
        </div>
      ))}
    </div>
  );
}

function DeploySection() {
  return (
    <div className="deploy-section">
      <div className="deploy-heading">DEPLOY YOUR PROJECT</div>
      <div className="deploy-grid">
        <div className="deploy-card">
          <h4>
            <span className="deploy-tag render">RENDER</span> (Backend - Flask + Node)
          </h4>
          <ol>
            <li>Create account on render.com</li>
            <li>New Web Service</li>
            <li>Connect your GitHub repository</li>
            <li>Set Build Command &amp; Start Command</li>
            <li>Add Environment Variables</li>
            <li>Click Deploy</li>
          </ol>
        </div>

        <div className="deploy-rocket">🚀</div>

        <div className="deploy-card">
          <h4>
            <span className="deploy-tag vercel">VERCEL</span> (Frontend - React)
          </h4>
          <ol>
            <li>Create account on vercel.com</li>
            <li>New Project</li>
            <li>Import your GitHub repository</li>
            <li>Framework Preset: Create React App</li>
            <li>Click Deploy</li>
          </ol>
        </div>

        <div className="deploy-card live">
          <h4>Your App Live 🎉</h4>
          <div className="globe">🌐</div>
          <p>Share your app with the world!</p>
          <button className="btn next full">Go Live</button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [current, setCurrent] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(null);

  const goBack = () => {
    if (index === 0) return;
    const updated = [...answers];
    updated.pop();
    setAnswers(updated);
    setCurrent("");
    setIndex(index - 1);
  };

  const nextQuestion = async () => {
    if (!current) return;
    const updated = [...answers, current];
    setAnswers(updated);
    setCurrent("");

    if (index < questions.length - 1) {
      setIndex(index + 1);
    } else {
      setLoading(true);
      try {
        const res = await fetch("http://127.0.0.1:5001/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: updated })
        });
        const data = await res.json();
        setResult(data.prediction);
      } catch (e) {
        setResult("Moderate Risk");
      }
      setLoading(false);
    }
  };

  const restart = () => {
    setIndex(0);
    setAnswers([]);
    setCurrent("");
    setResult("");
  };

  return (
    <div className="page">
      {!showQuiz && (
        <>
          {/* Top section: login + hero */}
          <div className="top-section">
            <LoginCard
              onLogin={() => setShowQuiz(true)}
              registeredUser={registeredUser}
              onRegister={(user) => setRegisteredUser(user)}
            />
            <HeroSection />
          </div>

          <DeploySection />
        </>
      )}

      {showQuiz && (
        <>
          {/* Quiz / Result section */}
          <div className="middle-section">
            {!result ? (
              <QuizCard
                index={index}
                current={current}
                setCurrent={setCurrent}
                goBack={goBack}
                nextQuestion={nextQuestion}
              />
            ) : null}
            {loading && <p className="loading">Analyzing your responses...</p>}
          </div>

          {/* Result + Mood tracker */}
          {result && (
            <div className="bottom-section">
              <ResultCard result={result} restart={restart} />
              <MoodTracker />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;