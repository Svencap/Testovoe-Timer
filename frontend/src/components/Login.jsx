import { useFormik } from 'formik';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import useAuth from '../hooks/useAuth.jsx';


const Login = () => {

  const navigation = useNavigate();
  const auth = useAuth();

  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post('/api/v1/login', values);
        localStorage.setItem('user', JSON.stringify(data));
        auth.logIn();
        navigation('/', { replace: true });
      } catch (error) {
        
      }
    },
  });

  useEffect(() => {
    localStorage.clear();
  }, []);


  return (
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body row p-5">
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center"></div>
            <form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
              <h1 className="text-center mb-4">Войти</h1>
              <div className="form-floating mb-3">
                <div className="mb-3 form-floating">
                  <input
                    placeholder="Ваш ник"
                    required=""
                    name="name"
                    type="text"
                    id="name"
                    className="form-control valid form-control"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                  <label htmlFor="name">Ваш ник</label>
                </div>
              </div>
              <div className="form-floating mb-3">
                <div className="mb-3 form-floating" type="password">
                  <input
                    required=""
                    placeholder="Ваш пароль"
                    name="password"
                    type="password"
                    id="password"
                    className="form-control valid form-control"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  <label htmlFor="password">Пароль</label>
                </div>
              </div>
              <button type="submit" className="w-100 mb-3 btn btn btn-primary">
                Войти
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
