import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormularioService } from '../../service/formulario/formulario';
import { Bibliotecas } from '../../service/bibliotecas/bibliotecas';
import { Documento, FormularioCompleto, Protocolo } from '../../models/formulario-dados';
import { FalarSobre } from '../../models/bibliotecas/bibliotecas';
import { response } from 'express';

@Component({
  selector: 'app-formulario',
  standalone: false,
  templateUrl: './formulario.html',
  styleUrl: './formulario.scss'
})
export class Formulario implements OnInit{

  formulario: FormGroup;
  documento?: Documento;
  protocolo?: Protocolo;
  bibFalarSobre: FalarSobre[] = [];

  constructor(
    private fb: FormBuilder, 
    private snackBar: MatSnackBar,
    private formularioService: FormularioService,
    private bibliotecaService: Bibliotecas
  ) {
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', Validators.required],
      cpf: ['', Validators.required],
      documento: [null, Validators.required],
      assunto: ['0', Validators.required],
      tipoPessoa: ['', Validators.required],
      tipoSolicitacao: ['', Validators.required],
      possuiProtocolos: ['', Validators.required],
      protocolos: [null, Validators.required],
      detalhes: ['', Validators.required],
    });
  }

  // Método para capturar o arquivo selecionado
  onFileSelected(event: Event, tipo: 'documento' | 'protocolo'): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
      if (tipo === 'documento') {
        this.documento = {
          file: file,
          nomeOriginal: file.name,
          tamanho: file.size,
          tipoArquivo: 3483
        };
      
      } else {
        this.protocolo = {
          file: file,
          nomeOriginal: 'Protocolo em aberto nos canais de atendimento da 99',
          tamanho: file.size,
          tipoArquivo: 4766
        };
      }

    } else {
      if (tipo === 'documento') {
        this.documento = undefined;
        this.formulario.get('documento')?.setValue(null);
      } else {
        this.protocolo = undefined;
        this.formulario.get('protocolos')?.setValue(null);
      }
    }
  }

  prepararDadosEnvio(): FormularioCompleto {
    const formValue = this.formulario.value;
    
    return {
      dados: {
        nome: formValue.nome,
        sobrenome: formValue.sobrenome,
        email: formValue.email,
        celular: formValue.celular,
        cpf: formValue.cpf,
        assunto: formValue.assunto,
        tipoPessoa: formValue.tipoPessoa,
        tipoSolicitacao: formValue.tipoSolicitacao,
        possuiProtocolos: formValue.possuiProtocolos,
        detalhes: formValue.detalhes
      },
      documento: this.documento!,
      protocolo: this.protocolo
    };
  }

  // Método para fazer download do arquivo original
  downloadOriginalFile(tipo: 'documento' | 'protocolo'): void {
    const arquivo = tipo === 'documento' ? this.documento : this.protocolo;
    if (!arquivo) return;
    
    const url = URL.createObjectURL(arquivo.file);
    const a = document.createElement('a');
    a.href = url;
    a.download = arquivo.nomeOriginal;
    a.click();
    URL.revokeObjectURL(url);

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

    const dadosParaEnvio = this.prepararDadosEnvio();    

    console.log(dadosParaEnvio)

    this.formularioService.enviarFormulario(dadosParaEnvio)
    .subscribe({
      next: (response) => {
        console.log('Resposta da API:', response);
      },
      error: (err) => {
        console.error('Erro na requisição:', err);
      }
    });
  }

  bibliotecaFalarSobre() {
    this.bibliotecaService
    .getBibFalarSobre()
    .subscribe({
      next: (response: any) => {
        this.bibFalarSobre = response.bibFala || [];
      },
      error: () => {
        this.bibFalarSobre = []; 
      }      
    })
  }

  ngOnInit(): void {
    this.bibliotecaFalarSobre();
  }

}
