import './appHeader.scss'

const AppHeader = () => {
	return(
		<header class="app__header">
		<h1 class="app__title">
			<a href="#">
				<span>Marvel</span> information portal
			</a>
		</h1>
		<nav class="app__menu">
			<ul>
				<li><a href="#">Characters</a></li>
				/
				<li><a href="#">Comics</a></li>
			</ul>
		</nav>
	</header>
	)
}

export default AppHeader;