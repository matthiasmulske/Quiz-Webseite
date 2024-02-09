import {
    Container,
    Nav,
    Navbar,
    NavDropdown,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {AiFillPicture, AiFillQuestionCircle, AiOutlineLogout, AiOutlineMedium, AiOutlineMessage} from "react-icons/ai";


function QuizNavbar() {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <AiFillPicture/>
                    <AiOutlineMessage/>
                    <AiFillQuestionCircle/>
                    <AiOutlineLogout/>
                    <Navbar.Brand href="#home">ISEF QUIZ</Navbar.Brand>
                </Container>
            </Navbar>
        </div>
    )

}

export default QuizNavbar;
