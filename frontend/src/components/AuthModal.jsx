import React from 'react';

function AuthModal({ isOpen, authMode, authForm, setAuthForm, error, loadingAuth, onSubmit, onClose, onSwitchMode }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-md shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {authMode === 'login' ? 'Login' : 'Register'}
          </h3>
          <button onClick={onClose} className="text-gray-500 dark:text-gray-400">Close</button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {authMode === 'register' && (
            <input
              value={authForm.name}
              onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
              placeholder="Name"
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          )}

          <input
            value={authForm.email}
            onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
            placeholder="Email"
            className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
          />

          <input
            type="password"
            value={authForm.password}
            onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
            placeholder="Password"
            className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
          />

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <div className="flex items-center justify-between gap-3">
            <button
              type="submit"
              disabled={loadingAuth}
              className="bg-gradient-to-r from-orange-500 to-green-500 text-white px-6 py-2 rounded-lg disabled:opacity-70"
            >
              {loadingAuth ? 'Please wait...' : authMode === 'login' ? 'Login' : 'Register'}
            </button>

            <button
              type="button"
              onClick={onSwitchMode}
              className="text-sm text-gray-500 dark:text-gray-400"
            >
              {authMode === 'login' ? 'Create an account' : 'Have an account? Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AuthModal;
