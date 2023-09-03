type Status = {
  codigo: number;
  descricao: string | null;
};

type Situacao = {
  codigo: number;
  descricao: string | null;
};

type TipoLicitacao = {
  codigoModalidadeLicitacao: number;
  modalidadeLicitacao: string;
  codigoTipoLicitacao: number;
  siglaTipoLicitacao: string;
  tipoLicitacao: string;
  tipoRealizacao: string;
  tipoJulgamento: string;
};

type UnidadeCompradora = {
  codigoUnidadeCompradora: number;
  nomeUnidadeCompradora: string;
  codigoComprador: number;
  nomeComprador: string | null;
  cidade: string;
  codigoMunicipioIbge: string | null;
  uf: string;
};

type Licitacao = {
  codigoLicitacao: number;
  numeroLicitacao: string | null;
  identificacao: string;
  numero: string;
  resumo: string;
  razaoSocial: string;
  nomeUnidade: string;
  status: Status;
  situacao: Situacao;
  tipoLicitacao: TipoLicitacao;
  codigoSituacaoEdital: number;
  codigoTratamentoDiferenciado: number;
  dataHoraInicioLances: string;
  dataHoraInicioPropostas: string;
  dataHoraFinalPropostas: string;
  dataHoraFinalLances: string | null;
  dataHoraPublicacao: string;
  isPublicado: boolean;
  unidadeCompradora: UnidadeCompradora;
  comprador: string | null;
  urlReferencia: string;
  statusProcessoPublico: Status;
  isExclusivoME: boolean;
};

export type GetProcessosReturn = {
  result: Licitacao[];
};
