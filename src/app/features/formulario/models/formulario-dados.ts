export interface Arquivo {
  file: File;               // O arquivo em si
  nomeOriginal: string;     // Nome original do arquivo
  tamanho: number;          // Tamanho em bytes
  tipoArquivo: number;      // Código do tipo de arquivo
}

export interface Documento extends Arquivo {
  tipoArquivo: 3483;        // Tipo fixo para documentos de identificação
}

export interface Protocolo extends Arquivo {
  tipoArquivo: 4766;        // Tipo fixo para protocolos
}

export interface FormularioDados {
  nome: string;
  sobrenome: string;
  email: string;
  celular: string;
  cpf: string;
  assunto: number;
  tipoPessoa: number;
  tipoSolicitacao: number;
  possuiProtocolos: number;
  detalhes: string;
}

export interface FormularioCompleto {
  dados: FormularioDados;
  documento: Documento;
  protocolo?: Protocolo;     // Opcional pois pode não ter protocolos
}