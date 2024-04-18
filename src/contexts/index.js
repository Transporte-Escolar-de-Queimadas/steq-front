import { RoutesProvider } from './routesContext';
import { UserProvider } from './userContext';

const providers = [RoutesProvider, UserProvider];

export default function AppContext(props) {
    const { children, ...rest } = props;
    return (
        <>
            {providers.reduceRight((acc, Comp) => {
                return <Comp {...rest}>{acc}</Comp>
            }, children)}
        </>
    )
}