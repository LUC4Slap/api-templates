import { Injectable } from '@nestjs/common';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TecnologiasDto } from './dto/tecnologias.dto';

@Injectable()
export class TemplateService {
  constructor(private prisma: PrismaService) {}
  async create(createTemplateDto: CreateTemplateDto) {
    const nomesTecnologias = createTemplateDto.tecnologias;
    console.log(nomesTecnologias);

    // Buscar tecnologias já existentes no banco
    const tecnologiasExistentes = await this.prisma.tecnologia.findMany({
      where: {
        nome: {
          in: nomesTecnologias,
        },
      },
    });

    const nomesExistentes = tecnologiasExistentes.map((tec) => tec.nome);

    // Descobrir quais não existem ainda
    const novasTecnologias = nomesTecnologias.filter(
      (nome) => !nomesExistentes.includes(nome),
    );

    // Criar as novas tecnologias, se houver
    if (novasTecnologias.length) {
      await this.prisma.tecnologia.createMany({
        data: novasTecnologias.map((nome) => ({ nome })),
      });
    }

    // Buscar todas as tecnologias novamente para garantir que temos os IDs corretos
    const todasTecnologias = await this.prisma.tecnologia.findMany({
      where: {
        nome: {
          in: nomesTecnologias,
        },
      },
    });

    const tecnologiasIds = todasTecnologias.map((tec) => tec.id);

    // Criar o template e vincular as tecnologias
    return await this.prisma.template.create({
      data: {
        nome: createTemplateDto.nome,
        descricao: createTemplateDto.descricao,
        valor: createTemplateDto.valor,
        autor: createTemplateDto.autor,
        tecnologias: {
          connect: tecnologiasIds.map((id) => ({ id })),
        },
      },
      include: {
        tecnologias: true,
      },
    });
  }

  findAll() {
    return this.prisma.template.findMany({
      include: { tecnologias: true },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} template`;
  }

  update(id: number, updateTemplateDto: UpdateTemplateDto) {
    return `This action updates a #${id} template`;
  }

  remove(id: number) {
    return `This action removes a #${id} template`;
  }

  buscarTecnologias(nome: string | string[] | TecnologiasDto[]) {
    let clausula = {};
    if (Array.isArray(nome)) {
      clausula = {
        in: nome.map((tecnologia) => tecnologia),
      };
    } else
      clausula = {
        contains: nome,
      };
    return this.prisma.tecnologia.findMany({
      where: {
        nome: clausula,
      },
    });
  }
}
