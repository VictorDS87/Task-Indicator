import logoImg from '../../../assets/logo.svg'
import { Container } from "./styles";

export function Header() {
    return (
        <Container><img src={logoImg} alt="" />
        <span></span>
            <p>s os seus <span>problemas resolvidos</span> em um clique</p></Container>
    )
}