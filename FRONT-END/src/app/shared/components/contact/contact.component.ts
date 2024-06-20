import { Component } from '@angular/core';
import L from 'leaflet';

declare const google: any;
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  ngOnInit(): void {
    this.loadMap()
  }

  loadMap() {
    const map = L.map('map').setView([14.722784, -17.467608], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([14.8054959, -17.3391411]).addTo(map)
      .bindPopup('Votre position')
      .openPopup();
  }

  async handleSubmit(form: HTMLFormElement) {
    const status = document.getElementById("my-form-status");
    const formData = new FormData(form);
    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
        alert('Votre message a été envoyé avec succès!');
        form.reset();
      } else {
        const responseData = await response.json();
        if (responseData.errors) {
          status!.innerHTML = responseData.errors.map((error: any) => error.message).join(", ");
        } else {
          status!.innerHTML = "Oops! Il y a eu un problème lors de la soumission du formulaire.";
        }
      }
    } catch (error) {
      status!.innerHTML = "Oops! Il y a eu un problème lors de la soumission du formulaire.";
    }
  }

}
