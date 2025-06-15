import ExcelJS from 'exceljs';
import PDFDocument from 'pdfkit';

export async function gerarExcel(transacoes: any[]): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Relatorio');
    sheet.columns = [
        { header: 'ID', key: 'id_transacao', width: 36 },
        { header: 'Conta Origem', key: 'id_conta_origem', width: 20 },
        { header: 'Conta Destino', key: 'id_conta_destino', width: 20 },
        { header: 'Tipo', key: 'tipo_transacao', width: 15 },
        { header: 'Valor', key: 'valor', width: 10 },
        { header: 'Data', key: 'data_hora', width: 20 },
        { header: 'Descricao', key: 'descricao', width: 30 },
    ];
    transacoes.forEach(t => sheet.addRow(t));
    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer);
}

export async function gerarPdf(transacoes: any[]): Promise<Buffer> {
    const doc = new PDFDocument({ margin: 30 });
    const chunks: Buffer[] = [];
    return new Promise((resolve, reject) => {
        doc.on('data', chunk => chunks.push(chunk as Buffer));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', reject);

        doc.fontSize(16).text('Relatorio Financeiro', { align: 'center' });
        doc.moveDown();
        transacoes.forEach(t => {
            doc.fontSize(10).text(
                `ID: ${t.id_transacao} | Origem: ${t.id_conta_origem} | Destino: ${t.id_conta_destino || ''} | Tipo: ${t.tipo_transacao} | Valor: ${t.valor} | Data: ${t.data_hora} | Descricao: ${t.descricao}`
            );
            doc.moveDown(0.5);
        });
        doc.end();
    });
}
