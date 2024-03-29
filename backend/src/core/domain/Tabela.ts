import { randomUUID } from "crypto";

export interface IAmortizacao {
  id: string;
  periodo: number;
  parcela: number;
  juros: number;
  amortizacao: number;
  saldo: number;
}

export abstract class Calculos {
  public static arredondar(valor: number) {
    return Number(valor.toFixed(2));
  }
}

export abstract class Tabela {
  protected emprestimo: number;
  protected quantidadeDeParcelas: number;
  protected taxa: number;
  protected dados: IAmortizacao[] = [];

  constructor(emprestimo: number, quantidadeDeParcelas: number, taxa: number) {
    this.emprestimo = Number(emprestimo);
    this.quantidadeDeParcelas = Number(quantidadeDeParcelas);
    this.taxa = Number(taxa);
  }

  public inserir(
    periodo: number,
    parcela: number,
    juros: number,
    amortizacao: number,
    saldo: number
  ) {
    this.dados.push({
      id: randomUUID(),
      periodo: periodo,
      parcela: Calculos.arredondar(parcela),
      juros: Calculos.arredondar(juros),
      amortizacao: Calculos.arredondar(amortizacao),
      saldo: Calculos.arredondar(saldo),
    });
  }

  public atualizarSaldo(saldo: number, abatimento: number): number {
    return saldo - abatimento;
  }

  public calcularJuros(saldo: number): number {
    return saldo * this.taxa;
  }

  public exibirTabela(): IAmortizacao[] {
    return this.dados;
  }

  public abstract calcularParcela(juros?: number, amortizacao?: number): number;
  public abstract calcularAmortizacao(parcela?: number, juros?: number): number;
  public abstract inserirNaTabela(): void;
}
