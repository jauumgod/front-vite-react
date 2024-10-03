// InputComponent.jsx
import React from 'react';

const InputComponent = ({ type, placeholder, value, onChange, isPassword, required }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="relative">
      <input
        type={isPassword ? (showPassword ? 'text' : 'password') : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="border border-slate-300 outline-slate-400 px-4 py-2 rounded-md w-full"
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-600"
        >
          {showPassword ? 'Ocultar' : 'Mostrar'}
        </button>
      )}
    </div>
  );
};

export default InputComponent;
