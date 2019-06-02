
import api from './api';

export class App {
  constructor() {
    console.log('App OK');
    this.repositories = [];
    
    this.formEl = document.querySelector('#repo-form');
    this.listEl = document.querySelector('#repo-list');
    this.inputEl = document.querySelector('input[name=repository]');
    
    this.registerHandlers();
  }
  
  registerHandlers() {
    this.formEl.onsubmit = event => this.addRepository(event);
  }
  
  setLoading(loading = true) {
    if (loading) {
      const loadingEl = document.createElement('span')
      loadingEl.appendChild(document.createTextNode('Carregando'))
      loadingEl.setAttribute('id', 'loading');
      
      this.formEl.appendChild(loadingEl);
    } else {
      this.formEl.querySelector('#loading').remove();
    }
    
  }
  
  async addRepository(event) {
    event.preventDefault();
    
    const repoInput = this.inputEl.value;
    
    if (!repoInput) {
      return;
    }
    this.setLoading()
    try {
      const response = await api.get(`/repos/${repoInput}`);
      const { name, description, html_url, owner: { avatar_url } } = response.data;
      
      this.repositories.push({ name, description, avatar_url, html_url });
      
      this.inputEl.value = '';
      this.render();
    } catch (e) {
      alert('O repositório não existe!');
    }
    this.setLoading(false);
  }
  
  render() {
    this.listEl.innerHTML = '';
    
    this.repositories.forEach(repo => {
      const imgEl = new Image()
      imgEl.setAttribute('src', repo.avatar_url);
      
      const titleEl = document.createElement('strong');
      titleEl.appendChild(document.createTextNode(repo.name));
      
      const descriptionEL = document.createElement('p');
      descriptionEL.appendChild(document.createTextNode(repo.description));
      
      const linkEl = document.createElement('a');
      linkEl.setAttribute('target', '_blank');
      linkEl.setAttribute('href', repo.html_url)
      linkEl.appendChild(document.createTextNode('Acessar'));
      
      const listItemEl = document.createElement('li');
      listItemEl.appendChild(imgEl);
      listItemEl.appendChild(titleEl);
      listItemEl.appendChild(descriptionEL);
      listItemEl.appendChild(linkEl);
      
      this.listEl.appendChild(listItemEl);
    })
  }
}
