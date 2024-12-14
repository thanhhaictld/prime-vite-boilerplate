/* eslint-disable @next/next/no-img-element */

import { APP_CONFIG } from "@app/AppConfig";

const AppFooter = () => {
	return (
		<footer className="bg-white dark:bg-gray-900">
			<div className="container flex flex-col items-center justify-center p-6 mx-auto space-y-4 sm:space-y-0 sm:flex-row">
				<p className="text-sm text-gray-600 dark:text-gray-300">
					{APP_CONFIG.APP_FOOTER}
				</p>
			</div>
		</footer>
	);
};

export default AppFooter;
