const notFoundMiddleware = (req, res) => {
  return res.status(404).json({
    message: `Invalid Url:$(req.originalUrl)`,
  });
};

export default notFoundMiddleware;
