import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import { Card } from "../components/Card.jsx"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {

  const {store, dispatch} =useGlobalReducer()

	return (
		<div className="text-center mt-5">
			<h1>Lista de Contactos </h1>
			<div className= "d- flex justify-content-center">
				<Card/>
			</div>
			
		
			
		</div>
	);
}; 