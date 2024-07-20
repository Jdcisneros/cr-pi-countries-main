import loading from "../../assets/loading.gif";
import style from "./loading.module.css";

const Loading = () => {
  return (
    <div className={style.loadingContainer}>
      <div className={style.loadingImgP}>
        <div>
          <img src={loading} alt="Loading..." />
        </div>
        <div className={style.loadingContent}>
          <p>Cargando...</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
