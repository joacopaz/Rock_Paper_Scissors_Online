import ConnectButton from "@components/ConnectButton";
import FetchButton from "@components/FetchButton";
import { api } from "@utils/api";
export default function Connect() {
	return (
		<div>
			<ConnectButton />
			<FetchButton
				endpoint={`${api}/create-account`}
				method="POST"
				cb={() => console.log(document.cookie)}
			/>
		</div>
	);
}
