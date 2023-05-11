import UserModel from '../models/UserModel.js';
import bcrypt from 'bcryptjs'; //сложность шифрования
import jwt from 'jsonwebtoken'; // Токен для определения авторизации
import RoleModel from '../models/RoleModel.js';

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });
};
class AuthController {
  //Registration
  async register(req, res) {
    try {
      const { username, password } = req.body;

      const isUsed = await UserModel.findOne({
        username: username.toLowerCase(),
      }); //findOne - поиск по конкретному свойству(полю)

      if (!username && !password) {
        return res.status(401).json({
          message: `Поля повинныі бути заповнені`,
          messageType: 'err',
        });
      }

      if (isUsed) {
        return res
          .status(402)
          .json({ message: `${username}  вже існує`, messageType: 'err' });
      }

      if (!password) {
        return res.status(403).json({
          message: `Поля повинныі бути заповнені`,
          messageType: 'err',
        });
      }
      // const roleUser = new RoleModel({ value: 'USER' });
      // const roleAdmin = new RoleModel({ value: 'ADMIN' });
      // const roleMaster = new RoleModel({ value: 'MASTER' });
      // roleUser.save();
      // roleAdmin.save();
      // roleMaster.save();

      const salt = bcrypt.genSaltSync(10); //сложность пароля

      const hash = bcrypt.hashSync(password, salt); //хеширование пароля

      const userRole = await RoleModel.findOne({ value: 'USER' }); //создаем роль

      const newUser = new UserModel({
        username: username.toLowerCase(),
        password: hash, //записываем вместо пароля уже хешированный пароль
        roles: [userRole.value],
      }); //создаем новый обьект Пользователя модели  который будет экземпляром UserModel
      //Создаем токен

      const token = generateAccessToken(newUser._id, newUser.roles);
      // const token = jwt.sign(
      //   {
      //     id: newUser._id,
      //   },
      //   process.env.JWT_SECRET,
      //   { expiresIn: '30d' }
      // );
      ///////////////////
      newUser.save();
      res.json({
        //отправляем на фронт обьект Пользователя и сообщение о успешной регистрации
        token,
        newUser,
        roles: newUser.roles[0],
        message: `Реєстрація пройшла успішно`,
        messageType: 'ok',
      });
    } catch (error) {
      console.log(error);
      res.json({
        message: 'Помилка при створенні користувача',
        messageType: 'err',
      });
    }
  }

  //Login

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await UserModel.findOne({
        username: username.toLowerCase(),
      });

      ////////
      if (!username && !password) {
        return res.status(404).json({
          message: `Поле Login повинныо бути заповнене`,
          messageType: 'err',
        });
      }

      if (!user) {
        return res.status(405).json({
          message: `Такого користувача ${username}  не існує`,
          messageType: 'err',
        });
      }

      if (!password) {
        return res.status(406).json({
          message: `Поле пароль повинно бути заповнене`,
          messageType: 'err',
        });
      }
      ///////////

      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
        return res.json({ message: 'Не вірний пароль', messageType: 'err' });
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
        message: 'Ви увійшли в систему',
        messageType: 'ok',
      });
    } catch (error) {
      res.json({
        message: 'Ошибка при авторизации пользователя',
        messageType: 'err',
      });
    }
  }

  //Get me

  async getMe(req, res) {
    try {
      const user = await UserModel.findById(req.userID);
      if (!user) {
        return res
          .status(402)
          .json({ message: `${username}  не существует`, messageType: 'err' });
      }

      const token = generateAccessToken(user._id, user.roles);

      // const token = jwt.sign(
      //   {
      //     id: user._id,
      //   },
      //   process.env.JWT_SECRET,
      //   { expiresIn: '30d' }
      // );

      res.json({
        user,
        token,
      });
    } catch (error) {
      res.json({ message: 'Нет доступа', messageType: 'err' });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await UserModel.find();

      if (!users) {
        return res
          .status(402)
          .json({ message: `${username}  не существует`, messageType: 'err' });
      }
      res.json(users);
    } catch (error) {
      res.json({ message: 'Нет доступа', messageType: 'err' });
    }
  }

  //Remove User
  async removeUser(req, res) {
    try {
      const post = await UserModel.findByIdAndDelete(req.params.id);
      if (!post) return res.json({ message: 'Такого поста не існує' });

      await UserModel.findByIdAndUpdate(req.userID, {
        $pull: { posts: req.params.id },
      });
      res.json({ message: 'Стаття була видалена' });
    } catch (error) {
      res.json({
        message:
          'Щось пішло не так в PostController removePost function ' +
          error.message,
      });
    }
  }

  //Update User
  async updateUser(req, res) {
    try {
      const { username, roles, id } = req.body;
      const user = await UserModel.findById(id);

      user.username = username;
      user.roles = [roles];

      await user.save();

      res.json(user);
    } catch (error) {
      res.json({
        message:
          'Щось пішло не так в PostController removePost function ' +
          error.message,
      });
    }
  }
}
export default new AuthController();
