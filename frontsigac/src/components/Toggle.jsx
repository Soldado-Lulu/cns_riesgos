export default function Toggle({ checked, onChange, disabled, label }) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer select-none">
      {label && <span className="text-sm">{label}</span>}
      <span
        className={`relative inline-block w-12 h-6 rounded-full transition ${
          checked ? 'bg-green-500' : 'bg-gray-300'
        } ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
        onClick={() => !disabled && onChange(!checked)}
        role="switch"
        aria-checked={checked}
        aria-disabled={disabled}
        tabIndex={0}
        onKeyDown={(e) => {
          if (!disabled && (e.key === 'Enter' || e.key === ' ')) onChange(!checked);
        }}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : ''
          }`}
        />
      </span>
    </label>
  );
}
