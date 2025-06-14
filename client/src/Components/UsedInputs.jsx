export const Message = ({ label, placeholder }) => {
  return (
    <div className="text-sm w-full">
      <label className="font-semibold text-border">{label}</label>
      <textarea
        placeholder={placeholder}
        className="w-full h-40 mt-2 p-6 border border-border rounded bg-main"
      ></textarea>
    </div>
  );
};

export const Select = ({ label, options, onChange }) => {
  return (
    <>
      <label className="text-border font-semibold">{label}</label>
      <select
        className="w-full mt-2 px-6 py-4 text-text bg-main border border-border rounded"
        onChange={onChange}
      >
        {options.map((o, index) => (
          <option key={index} value={o.value}>
            {o.title}
          </option>
        ))}
      </select>
    </>
  );
};

export const Input = ({ label, placeholder, type, bg, register, name, value, onChange }) => {
  return (
    <div className="text-sm w-full mt-3">
      <label className="text-border font-semibold">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        {...register}
        type={type}
        placeholder={placeholder}
        className={`w-full text-sm mt-2 p-5 border border-border rounded text-white ${
          bg ? "bg-main" : "bg-dry"
        } 
        }`}
      />
    </div>
  );
};
