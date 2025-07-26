import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormularioService } from '../../service/formulario';

@Component({
  selector: 'app-formulario',
  standalone: false,
  templateUrl: './formulario.html',
  styleUrl: './formulario.scss'
})
export class Formulario {

  formulario: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private snackBar: MatSnackBar,
    private formularioService: FormularioService
  ) {
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', Validators.required],
      cpf: ['', Validators.required],
      documento: [null, Validators.required],
      assunto: ['', Validators.required],
      tipoPessoa: ['', Validators.required],
      tipoSolicitacao: ['', Validators.required],
      possuiProtocolos: ['', Validators.required],
      protocolos: [null, Validators.required],
      detalhes: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.formulario.invalid) {
      this.snackBar.open('Por favor, preencha todos os campos obrigatórios.', 'Fechar', {
        duration: 4000,
        panelClass: ['bg-red-600', 'text-white'],
      });
      this.formulario.markAllAsTouched(); // marca todos os campos para exibir erros visuais, se aplicável
      return;
    }
    this.snackBar.open('Formulário enviado com sucesso!', 'Fechar', {
      duration: 3000,
      panelClass: ['bg-green-600', 'text-white'],
    });

    this.formularioService.getCategoriasPeloId(parseInt('1'))
    .subscribe({
      next: (response) => {
        console.log('Resposta da API:', response); // Log da resposta bem-sucedida
        // Aqui você pode trabalhar com os dados retornados
      },
      error: (err) => {
        console.error('Erro na requisição:', err); // Log de erros
      }
    });
  }
}
