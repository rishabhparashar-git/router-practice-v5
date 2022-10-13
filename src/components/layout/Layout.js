import classes from "./Layout.module.css";
import MainNavigation from "./MainNavigation";
export default function layout(props) {
  return (
    <>
      <MainNavigation />
      <main className={classes.main}>
        {props.children}
      </main>
    </>
  );
}
