import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";
import cn from "classnames";

const Login = () => {
  const navigation = useNavigate();
  const auth = useAuth();

  const [successAuth, setSuccessAuth] = useState(true);

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post("https://timer-0dus.onrender.com/api/v1/login", values);
        localStorage.setItem("user", JSON.stringify(data));
        auth.logIn();
        setSuccessAuth(true);
        navigation("/", { replace: true });
      } catch (error) {
        setSuccessAuth(false);
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
            <Form
              className="col-12 col-md-6 mt-3 mt-mb-0"
              onSubmit={formik.handleSubmit}
            >
              <h1 className="text-center mb-4">Войти</h1>
              <Form.Group
                className="form-floating mb-3"
                controlId="formBasicEmail"
              >
                <FloatingLabel
                  controlId="name"
                  label="Ваш ник"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Ваш ник"
                    required
                    name="name"
                    autoFocus
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    className={cn(
                      "form-control",
                      successAuth ? "valid" : "is-invalid"
                    )}
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group
                className="form-floating mb-3"
                controlId="formBasicPassword"
              >
                <FloatingLabel
                  controlId="password"
                  label="Пароль"
                  className="mb-3"
                  type="password"
                >
                  <Form.Control
                    type="password"
                    required
                    placeholder="Пароль"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    className={cn(
                      "form-control",
                      successAuth ? "valid" : "is-invalid"
                    )}
                  />
                  {!successAuth ? (
                    <div className="invalid-tooltip">
                      Неверные имя пользователя или пароль
                    </div>
                  ) : null}
                </FloatingLabel>
              </Form.Group>
              <Button
                variant="primary"
                className="w-100 mb-3 btn"
                type="submit"
              >
                Войти
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
