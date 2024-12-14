import { LayoutProvider } from "@components/layout/context/layoutcontext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PrimeReactProvider } from "primereact/api";
import { AppRouter } from "./AppRouter";
import { PrimeTheme } from "./app/theme/PrimeTheme";
import type { FunctionComponent } from "./common/types";

const queryClient = new QueryClient();

type AppProps = {};

const App = ({}: AppProps): FunctionComponent => {
	return (
		<QueryClientProvider client={queryClient}>
			<PrimeReactProvider
				value={{
					unstyled: true,
					pt: PrimeTheme
				}}
			>
				<LayoutProvider>
					<AppRouter />
				</LayoutProvider>
			</PrimeReactProvider>
		</QueryClientProvider>
	);
};

export default App;
