'use client'; 

import { useSession, signIn, signOut } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>加载中...</div>;
  }

  if (session) {
    return (
      <div>
        <h1>欢迎回来！</h1>
        <p>已登录为: {session.user?.name || session.user?.email}</p>
        <button onClick={() => signOut()}>退出登录</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Hello, Next.js!</h1>
      <button onClick={() => signIn('github')}>用 GitHub 登录</button>
    </div>
  );
}