import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl  } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-formulario',
  standalone: false,
  templateUrl: './formulario.html',
  styleUrl: './formulario.scss'
})
export class Formulario {

  formulario: FormGroup;
  campoAtualComErro: string = '';

  // Mapeamento de nomes amigáveis para os campos
  nomesCampos: { [key: string]: string } = {
    nome: 'Nome',
    sobrenome: 'Sobrenome',
    email: 'E-mail',
    celular: 'Celular com DDD',
    cpf: 'CPF',
    documentoIdentificacao: 'Documento de identificação',
    assunto: 'Assunto sobre quer falar',
    tipoUsuario: 'Tipo de usuário',
    tipoSolicitacao: 'Tipo de solicitação',
    possuiProtocolos: 'Possui protocolos abertos',
    detalhes: 'Detalhes da solicitação'
  };

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', Validators.required],
      cpf: ['', Validators.required],
      documentoIdentificacao: ['', Validators.required],
      assunto: ['', Validators.required],
      tipoUsuario: ['', Validators.required],
      tipoSolicitacao: ['', Validators.required],
      possuiProtocolos: ['', Validators.required],
      protocolosAbertos: [''],
      detalhes: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.formulario.valid) {
      // Lógica para enviar o formulário
      console.log('Formulário enviado:', this.formulario.value);
      return;
    }

    this.validarCamposUmPorUm();
  }

  validarCamposUmPorUm() {
    // Encontra o primeiro campo inválido
    const campoInvalido = Object.keys(this.formulario.controls).find(field => {
      const control = this.formulario.get(field);
      return control?.invalid && control?.errors?.['required'];
    });

    if (campoInvalido) {
      this.campoAtualComErro = campoInvalido;
      this.mostrarSnackBarParaCampo(campoInvalido);
      
      // Rola até o campo com erro
      setTimeout(() => {
        const elemento = document.querySelector(`[formControlName="${campoInvalido}"]`);
        elemento?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        (elemento as HTMLElement)?.focus();
      }, 100);
    }
  }

  mostrarSnackBarParaCampo(campo: string) {
    const nomeAmigavel = this.nomesCampos[campo] || campo;
    const mensagem = `Por favor, preencha o campo: ${nomeAmigavel}`;
    
    this.snackBar.open(mensagem, 'OK', {
      duration: 4000,
      panelClass: ['snackbar-error'],
      verticalPosition: 'bottom'
    }).afterDismissed().subscribe(() => {
      this.campoAtualComErro = '';
    });
  }

  getCampo(nomeCampo: string): AbstractControl | null {
    return this.formulario.get(nomeCampo);
  }

  campoEstaComErro(nomeCampo: string): boolean {
    const campo = this.getCampo(nomeCampo);
    return (this.campoAtualComErro === nomeCampo) || 
    (campo?.invalid && campo?.touched && campo?.errors?.['required']);
  }
}
