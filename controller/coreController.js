const sayHello = (req, res) => {
  return res.json({ message: "Hello World!" });
};

export { sayHello };
