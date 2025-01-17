function Button({ children, ...props }) {
  return (
    <button {...props} className={`button ${props.className || ""}`}>
      {children}
    </button>
  );
}

export default Button;
