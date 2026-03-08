import { type FormEvent, ReactNode, useMemo, useState } from 'react';
import './auth-gate.scss';

const AUTH_KEY = 'alra-studio-authenticated';

interface AuthGateProps {
  children: ReactNode;
}

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function AuthGate({ children }: AuthGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return window.localStorage.getItem(AUTH_KEY) === 'true';
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const canSubmit = useMemo(() => email.trim().length > 0 && password.trim().length > 0 && !loading, [email, password, loading]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    await wait(220);

    if (!email.includes('@')) {
      setLoading(false);
      setError('邮箱或密码错误，请重试');
      return;
    }

    if (password.length < 6) {
      setLoading(false);
      setError('邮箱或密码错误，请重试');
      return;
    }

    window.localStorage.setItem(AUTH_KEY, 'true');
    setIsAuthenticated(true);
    setLoading(false);
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="alra-login-shell">
      <aside className="alra-login-visual" aria-hidden="true">
        <div className="alra-login-visual__overlay" />
        <div className="alra-login-brand">
          <div className="alra-login-brand__title">Alra</div>
          <p>
            AI 驱动的美妆素材生成平台
            <br />
            为创意而生
          </p>
        </div>
      </aside>

      <main className="alra-login-main">
        <div className="alra-login-mobile-brand">Alra</div>
        <form className="alra-login-card" onSubmit={handleSubmit}>
          <h1>欢迎回来</h1>
          <p className="alra-login-desc">登录以继续使用素材生成平台</p>

          <label htmlFor="email">邮箱</label>
          <input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoComplete="email"
          />

          <label htmlFor="password">密码</label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            autoComplete="current-password"
          />

          {error ? <p className="alra-login-error">{error}</p> : null}

          <button type="submit" disabled={!canSubmit}>
            {loading ? '登录中...' : '登录'}
          </button>

          <p className="alra-login-register">
            还没有账户？ <a href="#" onClick={(e) => e.preventDefault()}>立即注册</a>
          </p>
        </form>
      </main>
    </div>
  );
}
