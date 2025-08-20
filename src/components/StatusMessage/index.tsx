import styles from "./StatusMessage.module.css";

type StatusMessageProps = {
  info?: boolean;
  loading?: boolean;
  error?: boolean;
  message?: string;
};

const StatusMessage = ({
  info,
  loading,
  error,
  message,
}: StatusMessageProps) => {
  if (info) {
    return (
      <div className={styles.info}>
        <h1>Info</h1>
        <p>{message}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <h1>Loading..</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <h1>An error has occured</h1>
        <p>{message}</p>
      </div>
    );
  }

  return (
    <div className={styles.unknown}>
      <h1>Something unknown happened :/</h1>
    </div>
  );
};

export default StatusMessage;
