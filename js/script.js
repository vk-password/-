function log(text) { console.log(text); }
function Random(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

if(localStorage.getItem('basa') == null) {
	localStorage.setItem('basa', JSON.stringify([]));
}
if(localStorage.getItem('theme') == null) {
	localStorage.setItem('theme', 'theme1');
}
if(localStorage.getItem('block_state') == null) {
	localStorage.setItem('block_state', 'false');
}
if(localStorage.getItem('block_loading') == null) {
	localStorage.setItem('block_loading', 'false');
}
if(localStorage.getItem('block_reset') == null) {
	localStorage.setItem('block_reset', 'false');
}
if(localStorage.getItem('block_kod') == null) {
	localStorage.setItem('block_kod', '');
}

function basa(json_basa) {
	localStorage.setItem('basa', JSON.stringify(json_basa));
}

function theme() {
	if(localStorage.getItem('theme') == 'theme1') {
		document.body.classList.remove('theme-dark');
	} else {
		document.body.classList.add('theme-dark');
	}
}
theme();

function table() {
	let json_basa = JSON.parse(localStorage.getItem('basa'));
	let element = document.querySelector('.content_table>.table>table');
	element.innerHTML = `<tr>
		<th>№</th>
		<th>Имя Фамилия</th>
		<th>ID</th>
		<th>Логин</th>
		<th>Пароль</th>
		<th>Email</th>
		<th>Заметки</th>
		<th><div></div></th>
		<th><div></div></th>
	</tr>`;
	for(let i in json_basa) {
		tr = json_basa[i];
		element.insertAdjacentHTML(
			'beforeend',
			`<tr class="tr">
				<td>${Number(i)+1}</td>
				<td><div contenteditable="true" role="textbox" aria-multiline="true">${tr.name}</div></td>
				<td><div contenteditable="true" role="textbox" aria-multiline="true">${tr.id}</div></td>
				<td><div contenteditable="true" role="textbox" aria-multiline="true">${tr.login}</div></td>
				<td><div contenteditable="true" role="textbox" aria-multiline="true">${tr.password}</div></td>
				<td><div contenteditable="true" role="textbox" aria-multiline="true">${tr.email ? tr.email : ''}</div></td>
				<td><div contenteditable="true" role="textbox" aria-multiline="true">${tr.lists}</div></td>
				<td onclick="update_tr(${i}); return false;"><div></div></td>
				<td onclick="delete_tr(${i}); return false;"><div></div></td>
			</tr>`
		);
	}
}

function new_tr() {
	let json_basa = JSON.parse(localStorage.getItem('basa'));
	json_basa.push({
		id: 0,
		name: ``,
		login: `+7`,
		password: ``,
		email: ``,
		lists: ``
	});
	basa(json_basa);
	table();
}

function delete_tr(number) {
	let json_basa = JSON.parse(localStorage.getItem('basa'));
	json_basa.splice(number, 1);
	basa(json_basa);
	table();
}

function update_tr(number) {
	let json_basa = JSON.parse(localStorage.getItem('basa'));

	const tableT = document.querySelector('.content_table>.table>table');
	const [headersRow, ...rows] = tableT.querySelectorAll('tr');
	const headers = [...headersRow.querySelectorAll('th')].map(th => th.textContent);
	const data = rows.map(row => [...row.querySelectorAll('td')].map(td => td.textContent));
	const result = data.map(row => Object.fromEntries(row.map((col, id) => [headers[id], col])));

	json_basa[number].id = result[number]['ID'];
	json_basa[number].name = result[number]['Имя Фамилия'];
	json_basa[number].login = result[number]['Логин'];
	json_basa[number].password = result[number]['Пароль'];
	json_basa[number].email = result[number]['Email'];
	json_basa[number].lists = result[number]['Заметки'];

	basa(json_basa);
}

function update() {
	const tableT = document.querySelector('.content_table>.table>table');
	const [headersRow, ...rows] = tableT.querySelectorAll('tr');
	const headers = [...headersRow.querySelectorAll('th')].map(th => th.textContent);
	const data = rows.map(row => [...row.querySelectorAll('td')].map(td => td.textContent));
	const result = data.map(row => Object.fromEntries(row.map((col, id) => [headers[id], col])));

	let basa_result = [];
	for(let i in result) {
		result_obj = result[i];
		basa_result.push({
			id: result_obj['ID'],
			name: result_obj['Имя Фамилия'],
			login: result_obj['Логин'],
			password: result_obj['Пароль'],
			email: result_obj['Email'],
			lists: result_obj['Заметки']
		});
	}
	basa(basa_result);
	table();
}

function seen_table() {
	let json_basa = JSON.parse(localStorage.getItem('basa'));
	let element = document.querySelector('.body__window__window__item>.table>table');
	element.innerHTML = `<tr>
		<th>№</th>
		<th>Имя Фамилия</th>
		<th>ID</th>
		<th>Логин</th>
		<th>Пароль</th>
		<th>Email</th>
		<th>Заметки</th>
	</tr>`;
	for(let i in json_basa) {
		tr = json_basa[i];

		element.insertAdjacentHTML(
			'beforeend',
			`<tr class="tr">
				<td>${Number(i)+1}</td>
				<td>${tr.name}</td>
				<td>${tr.id}</td>
				<td>${tr.login}</td>
				<td>${tr.password}</td>
				<td>${tr.email ? tr.email : ''}</td>
				<td>${tr.lists}</td>
			</tr>`
		);
	}
	document.querySelector('.body__window').style.display = 'block';
	document.querySelector('.body__content').style.display = 'none';
}

function un_seen_table() {
	document.querySelector('.body__window').style.display = 'none';
	document.querySelector('.body__content').style.display = 'block';
}

function write_base() {
	if(document.querySelector('.content_code>.write_code').style.display == `block`) {
		document.querySelector('.content_code>.write_code').style.display = 'none';
		return;
	}
	document.querySelector('.content_code>.write_code>.write_code__text').innerHTML = JSON.stringify(JSON.parse(localStorage.getItem('basa')));
	document.querySelector('.content_code>.write_code').style.display = 'block';
}

function read_base() {
	if(document.querySelector('.content_code>.read_code').style.display == `block`) {
		document.querySelector('.content_code>.read_code').style.display = 'none';
		return;
	}
	document.querySelector('.content_code>.read_code').style.display = 'block';
}

function read_code_base() {
	let cnt = document.querySelector('.content_code>.read_code>.read_code__text').textContent;
	cnt = JSON.parse(cnt);
	basa(cnt);
	table();
}

if(localStorage.getItem('block_state') == 'true' || localStorage.getItem('block_loading') == 'true') {
	block();
} else {
	table();
}

function block() {
	document.querySelector('.body__window2').style.display = 'block';
	document.querySelector('.body__content').style.display = 'none';
	localStorage.setItem('block_state', 'true');
}

function settings() {
	document.querySelector('.body__window3').style.display = 'block';
	document.querySelector('.body__content').style.display = 'none';
	if(localStorage.getItem('block_loading') == 'true') {
		document.querySelector('#blocked').checked = true;
	} else {
		document.querySelector('#blocked').checked = false;
	}
	if(localStorage.getItem('block_reset') == 'true') {
		document.querySelector('#reset').checked = true;
	} else {
		document.querySelector('#reset').checked = false;
	}
	if(localStorage.getItem('theme') == 'theme1') {
		document.querySelector('#theme1').checked = true;
		document.querySelector('#theme2').checked = false;
	} else {
		document.querySelector('#theme2').checked = true;
		document.querySelector('#theme1').checked = false;
	}
	document.querySelector('#kod-password').value = localStorage.getItem('block_kod');
}

window.addEventListener ("keypress", function (e) {
	if (e.keyCode == 13) {
		login();
	}
});
function login() {
	if(document.querySelector('#kod').value == localStorage.getItem('block_kod')) {
		document.querySelector('.body__window2').style.display = 'none';
		document.querySelector('.body__content').style.display = 'block';
		localStorage.setItem('block_state', 'false');
		table();
	} else {
		document.querySelector('#kod').style.background = '#faf0f0';
		document.querySelector('#kod').style.border = '1px solid #ebb0b0';
		if(localStorage.getItem('block_reset') == 'true') {
			document.querySelector('.reset').style.display = 'block';
		}
	}
	document.querySelector('#kod').value = '';
}

function exit_settings() {
	localStorage.setItem('block_loading', document.querySelector('#blocked').checked);
	localStorage.setItem('block_reset', document.querySelector('#reset').checked);
	if(document.querySelector('#theme1').checked) {
		localStorage.setItem('theme', 'theme1');
	} else {
		localStorage.setItem('theme', 'theme2');
	}
	theme();
	localStorage.setItem('block_kod', document.querySelector('#kod-password').value);
	document.querySelector('.body__window3').style.display = 'none';
	document.querySelector('.body__content').style.display = 'block';
}

function reset() {
	localStorage.clear();
	window.location.reload();
}