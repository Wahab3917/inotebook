import Notes from "./Notes";

export const Home = (props) => {

  const { showAlert } = props;

  return (
    <>

      <div className="container m-4">
        <Notes showAlert={showAlert}/>
      </div>

    </>
  )
}

export default Home

