import UserModel from '../models/UserModel.js';
import bcrypt from 'bcryptjs'; //сложность шифрования
import jwt from 'jsonwebtoken'; // Токен для определения авторизации

class AuthController {
  //Registration
  async register(req, res) {
    try {
      const { username, password } = req.body;

      const isUsed = await UserModel.findOne({ username }); //findOne - поиск по конкретному свойству(полю)
      if (isUsed) {
        return res.status(402).json({ message: `${username}  уже существует` });
      }

      const salt = bcrypt.genSaltSync(10); //сложность пароля

      const hash = bcrypt.hashSync(password, salt); //хеширование пароля

      const newUser = new UserModel({
        username,
        password: hash, //записываем вместо пароля уже хешированный пароль
        group: 'user',
      }); //создаем новый обьект Пользователя модели  который будет экземпляром UserModel

      await UserModel.create(newUser); //сохраняе нового пользователя в базу данных
      res.json({
        //отправляем на фронт обьект Пользователя и сообщение о успешной регистрации
        newUser,
        message: `Регистрация прошла успешно`,
      });
    } catch (error) {
      res.json({ message: 'Ошибка при создании пользователя' });
    }
  }

  //Login

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await UserModel.findOne({ username });

      if (!user) {
        return res.status(402).json({ message: `${username}  не существует` });
      }
      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
        return res.json({ message: 'Password incorrect' });
      }

      // res.json({ message: 'gfasdhfasdfkasdgjkgfadg' });
      //Создаем веб-токен на 30 дней

      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
      );
      /////////////////////////////////

      res.json({
        token,
        user,
        message: 'Вы вошли в систему',
      });
    } catch (error) {
      res.json({ message: 'Ошибка при авторизации пользователя' });
    }
  }

  //Get me

  async getMe(req, res) {
    try {
      const user = await UserModel.findById(req.userID);
      if (!user) {
        return res.status(402).json({ message: `${username}  не существует` });
      }
      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
      );

      res.json({
        user,
        token,
      });
    } catch (error) {
      res.json({ message: 'Нет доступа' });
    }
  }
}
export default new AuthController();
