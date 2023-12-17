const responseMiddleware = (req, res, next) => {
  const { data, err } = res;

  if (err) {
    // Обработка ошибок запроса
    const statusCode = err.statusCode || 500;
    const errorMessage = err.message || 'Internal Server Error';

    res.status(statusCode).json({ error: true, message: errorMessage });
  } else if (data) {
    // Отправка успешного результата
    res.status(200).json({ error: false, data });
  } else {
    // Если ни один из случаев не подходит, продолжаем цепочку middleware
    next();
  }
};

export { responseMiddleware };
