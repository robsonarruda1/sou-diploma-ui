import React, { Component } from 'react';
import './style.scss';
import user from '../../assets/imgs/user.jpg';
import editar from '../../assets/imgs/editar.jpg';
import { Formik, Form } from 'formik';
import Dropzone from 'react-dropzone';
import {
  Row,
  Col,
  DragDrop,
  Text,
  Document,
  Accepted,
  Icon,
  Field,
  Button
} from './styles';
import Upload from '../../assets/imgs/upload.svg';
import Open from '../../assets/imgs/open.svg';
import Success from '../../assets/imgs/sucesso_upload.svg';
import PersonalData from '../../../src/services/PersonalDataApi';
import City from '../../../src/services/CityApi';
import Nationality from '../../../src/services/NationalityApi';
import Emitter from '../../../src/services/EmitterApi';
import Naturalness from '../../../src/services/NaturalnessApi';

class RegistrationData extends Component {
  state = {
    courses: [],
    personal: [],
    city: [],
    nationality: [],
    emitter: [],
    naturalness: []
  };

  handleClick = id => {
    this.props.history.push(`/enabled/${id}`);
  };

  async componentDidMount() {
    const { id } = this.props.match.params;

    const resPersonal = await PersonalData.get(
      `/v_dados_pessoais?_where=(id,eq,${id})`
    );

    const resCourse = await PersonalData.get(
      `/v_dados_ingresso?_where=(id,eq,${id})`
    );

    const resCity = await PersonalData.get(`/v_cidade?_where=(id,eq,${id})`);

    const resNationality = await PersonalData.get(
      `/v_nacionalidade?_where=(id,eq,${id})`
    );

    const resEmitter = await PersonalData.get(
      `/v_orgao_emissor?_where=(id,eq,${id})`
    );

    const resNaturalness = await PersonalData.get(
      `/v_cidade2?_where=(id2,eq,${id})`
    );

    console.log(resPersonal.data);

    this.setState({
      courses: resCourse.data,
      personal: resPersonal.data,
      city: resCity.data,
      nationality: resNationality.data,
      emitter: resEmitter.data,
      naturalness: resNaturalness.data
    });
  }

  render() {
    return (
      <div>
        <Formik
          initialValues={{ files: { rg: {}, history: {}, conclusion: {} } }}
          render={({ setFieldValue, values }) => (
            <div className="container-fluid wrap">
              <h3 className="title-registration">Dados Cadastrais</h3>

              <div className="row espaco">
                <div className="col-md-12">
                  <fieldset className="border">
                    <span className="title-box">Nome Civil</span>
                    {this.state.personal.map(data => (
                      <p>
                        <img
                          data-toggle="modal"
                          data-target="#myModal"
                          onclick="load_modal('');"
                          src={editar}
                        />
                        {data.name}
                      </p>
                    ))}
                  </fieldset>
                </div>
              </div>
              <div className="row espaco">
                <div className="col-md-12">
                  <fieldset className="border">
                    <span className="title-box">Nome Social</span>
                    {this.state.personal.map(data => (
                      <p>
                        <img
                          data-toggle="modal"
                          data-target="#myModal"
                          onclick="load_modal('');"
                          src={editar}
                        />
                        {data.assumed_name}
                      </p>
                    ))}
                  </fieldset>
                </div>
              </div>
              <br />
              <div className="col-md-4">
                <Row>
                  <Col>
                    <Dropzone
                      accept="image/jpeg,image/jpg,image/png,image/bmp,application/pdf"
                      onDrop={([file, ...rest]) => {
                        setFieldValue(
                          'files.rg',
                          Object.assign(file, {
                            preview: URL.createObjectURL(file)
                          })
                        );
                      }}
                      multiple={false}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <DragDrop {...getRootProps()}>
                          <Document>RG</Document>
                          <Text>Arraste para cá ou</Text>
                          <Icon
                            src={
                              JSON.stringify(values.files.rg) !== '{}'
                                ? Success
                                : Upload
                            }
                          />
                          <Field {...getInputProps()} />
                          <Button>Procure no computador</Button>
                          <Accepted>
                            Arquivos aceitos: pdf, jpg, png, bmp
                          </Accepted>
                        </DragDrop>
                      )}
                    </Dropzone>
                  </Col>
                </Row>
              </div>
              <div className="row espaco">
                <div className="col-md-4">
                  <fieldset className="border">
                    <span className="title-box">Documento de Identidade</span>
                    {this.state.personal.map(data => (
                      <p>
                        <img
                          data-toggle="modal"
                          data-target="#myModal"
                          onclick="load_modal('');"
                          src={editar}
                        />
                        {data.rg_number}
                      </p>
                    ))}
                  </fieldset>
                </div>
                <div className="col-md-4">
                  <fieldset className="border">
                    <span className="title-box">Emissor/Estado</span>
                    <select class="form-control">
                      {this.state.emitter.map(data => (
                        <option>{data.name}</option>
                      ))}
                    </select>
                  </fieldset>
                </div>
                <div className="col-md-4">
                  <fieldset className="border">
                    <span className="title-box">Nacionalidade</span>
                    <select class="form-control">
                      {this.state.nationality.map(data => (
                        <option>{data.portuguese_name}</option>
                      ))}
                    </select>
                  </fieldset>
                </div>
              </div>

              <div className="row espaco">
                <div className="col-md-4">
                  <fieldset className="border">
                    <span className="title-box">CPF</span>
                    {this.state.personal.map(data => (
                      <p>
                        <img
                          data-toggle="modal"
                          data-target="#myModal"
                          onclick="load_modal('');"
                          src={editar}
                        />
                        {data.cpf}
                      </p>
                    ))}
                  </fieldset>
                </div>
                <div className="col-md-4">
                  <fieldset className="border">
                    <span className="title-box">Titulo de Eleitor</span>
                    {this.state.personal.map(data => (
                      <p>
                        <img
                          data-toggle="modal"
                          data-target="#myModal"
                          onclick="load_modal('');"
                          src={editar}
                        />
                        {data.titulo_number}
                      </p>
                    ))}
                  </fieldset>
                </div>
                <div className="col-md-4">
                  <fieldset className="border">
                    <span className="title-box">Naturalidade</span>
                    <select class="form-control">
                      {this.state.naturalness.map(data => (
                        <option>{data.name2}</option>
                      ))}
                    </select>
                  </fieldset>
                </div>
              </div>

              <div className="row espaco">
                <div className="col-md-12">
                  <fieldset className="border">
                    <span className="title-box">Nome da Mãe</span>
                    {this.state.personal.map(data => (
                      <p>
                        <img
                          data-toggle="modal"
                          data-target="#myModal"
                          onclick="load_modal('');"
                          src={editar}
                        />
                        {data.mothers_name}
                      </p>
                    ))}
                  </fieldset>
                </div>
              </div>
              <div className="row espaco">
                <div className="col-md-12">
                  <fieldset className="border">
                    <span className="title-box">Nome do Pai</span>
                    {this.state.personal.map(data => (
                      <p>
                        <img
                          data-toggle="modal"
                          data-target="#myModal"
                          onclick="load_modal('');"
                          src={editar}
                        />
                        {data.fathers_name}
                      </p>
                    ))}
                  </fieldset>
                </div>
              </div>
              <div className="row espaco">
                <div className="col-md-12">
                  <fieldset className="border">
                    <span className="title-box">
                      Endereço Residencial (com complementos)
                    </span>
                    {this.state.personal.map(data => (
                      <p>
                        <img
                          data-toggle="modal"
                          data-target="#myModal"
                          onclick="load_modal('');"
                          src={editar}
                        />
                        {data.street}&nbsp;
                        {data.street_number}&nbsp;-&nbsp;
                        {data.street_complement}
                      </p>
                    ))}
                  </fieldset>
                </div>
              </div>
              <div className="row espaco">
                <div className="col-md-3">
                  <fieldset className="border">
                    <span className="title-box">CEP</span>
                    {this.state.personal.map(data => (
                      <p>
                        <img
                          data-toggle="modal"
                          data-target="#myModal"
                          onclick="load_modal('');"
                          src={editar}
                        />

                        {data.zipcode}
                      </p>
                    ))}
                  </fieldset>
                </div>
                <div className="col-md-3">
                  <fieldset className="border">
                    <span className="title-box">Bairro</span>
                    {this.state.personal.map(data => (
                      <p>
                        <img
                          data-toggle="modal"
                          data-target="#myModal"
                          onclick="load_modal('');"
                          src={editar}
                        />
                        {data.neighborhood}
                      </p>
                    ))}
                  </fieldset>
                </div>
                <div className="col-md-3">
                  <fieldset className="border">
                    <span className="title-box">Cidade</span>
                    <select class="form-control">
                      {this.state.city.map(data => (
                        <option>{data.name}</option>
                      ))}
                    </select>
                  </fieldset>
                </div>
                <div className="col-md-3">
                  <fieldset className="border">
                    <span className="title-box">Estado</span>
                    <select class="form-control">
                      <option value="AC">Acre</option>
                      <option value="AL">Alagoas</option>
                      <option value="AP">Amapá</option>
                      <option value="AM">Amazonas</option>
                      <option value="BA">Bahia</option>
                      <option value="CE">Ceará</option>
                      <option value="DF">Distrito Federal</option>
                      <option value="ES">Espírito Santo</option>
                      <option value="GO">Goiás</option>
                      <option value="MA">Maranhão</option>
                      <option value="MT">Mato Grosso</option>
                      <option value="MS">Mato Grosso do Sul</option>
                      <option value="MG">Minas Gerais</option>
                      <option value="PA">Pará</option>
                      <option value="PB">Paraíba</option>
                      <option value="PR">Paraná</option>
                      <option value="PE">Pernambuco</option>
                      <option value="PI">Piauí</option>
                      <option value="RJ">Rio de Janeiro</option>
                      <option value="RN">Rio Grande do Norte</option>
                      <option value="RS">Rio Grande do Sul</option>
                      <option value="RO">Rondônia</option>
                      <option value="RR">Roraima</option>
                      <option value="SC">Santa Catarina</option>
                      <option value="SP">São Paulo</option>
                      <option value="SE">Sergipe</option>
                      <option value="TO">Tocantins</option>
                    </select>
                  </fieldset>
                </div>
              </div>
              <div className="row espaco">
                <div className="col-md-6">
                  <fieldset className="border">
                    <span className="title-box">E-mail Pessoal</span>
                    {this.state.personal.map(data => (
                      <p>
                        <img
                          data-toggle="modal"
                          data-target="#myModal"
                          onclick="load_modal('');"
                          src={editar}
                        />
                        {data.email_pessoal}
                      </p>
                    ))}
                  </fieldset>
                </div>
                <div className="col-md-6">
                  <fieldset className="border">
                    <span className="title-box">E-mail Institucional</span>
                    {this.state.personal.map(data => (
                      <p>
                        <img
                          data-toggle="modal"
                          data-target="#myModal"
                          onclick="load_modal('');"
                          src={editar}
                        />
                        {data.email_inst}
                      </p>
                    ))}
                  </fieldset>
                </div>
              </div>
              <h3 className="title-registration">Dados de Ingresso</h3>
              <div className="row espaco">
                <div className="col-md-4">
                  <fieldset className="border">
                    <span className="title-box">Curso</span>
                    {this.state.courses.map(data => (
                      <p>{data.name}</p>
                    ))}
                  </fieldset>
                </div>
                <div className="col-md-4">
                  <fieldset className="border">
                    <span className="title-box">Nível do Curso</span>
                    {this.state.courses.map(data => (
                      <p>{data.nivel}</p>
                    ))}
                  </fieldset>
                </div>
                <div className="col-md-4">
                  <fieldset className="border">
                    <span className="title-box">Tipo de Curso</span>
                    {this.state.courses.map(data => (
                      <p>{data.name}</p>
                    ))}
                  </fieldset>
                </div>
              </div>
              <div className="row espaco">
                <div className="col-md-4">
                  <fieldset className="border">
                    <span className="title-box">Polo</span>
                    {this.state.courses.map(data => (
                      <p>{data.polo}</p>
                    ))}
                  </fieldset>
                </div>
                <div className="col-md-4">
                  <fieldset className="border">
                    <span className="title-box">Semestre/Ano de Ingresso</span>
                    {this.state.courses.map(data => (
                      <p>{data.year_entry}</p>
                    ))}
                  </fieldset>
                </div>
                <div className="col-md-4">
                  <fieldset className="border">
                    <span className="title-box">Semestre/Ano de Conclusão</span>
                    {this.state.courses.map(data => (
                      <p>{data.date_conclusion}</p>
                    ))}
                  </fieldset>
                </div>
              </div>
              <div className="row espaco">
                <div className="col-md-4">
                  <fieldset className="border">
                    <span className="title-box">Grau Conferido</span>
                    {this.state.courses.map(data => (
                      <p>{data.grau_conferido}</p>
                    ))}
                  </fieldset>
                </div>
                <div className="col-md-4">
                  <fieldset className="border">
                    <span className="title-box">Data da Colação Grau</span>
                    {this.state.courses.map(data => (
                      <p>{data.date_collation}</p>
                    ))}
                  </fieldset>
                </div>
                <div className="col-md-4">
                  <fieldset className="border">
                    <span className="title-box">
                      Data de Expedição do Diploma
                    </span>
                    <p>Pedro Souza</p>
                  </fieldset>
                </div>
              </div>
              <br />
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="float-right">
                      {this.state.courses.map(data => (
                        <a
                          className="selecionar"
                          onClick={() => this.handleClick(data.id)}
                        >
                          DEFERIR
                        </a>
                      ))}
                    </div>
                    <div className="float-right">
                      <a className="voltar" href="tg">
                        VOLTAR
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <br />

              <div
                className="modal fade"
                id="myModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="myModalLabel"
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h4 className="modal-title" id="myModalLabel">
                        Alterando Usuário
                      </h4>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <form className="form-inline" method="post">
                        <div className="input-group">
                          <span className="input-group-addon glyphicon glyphicon-user" />
                          <input
                            name="name"
                            type="text"
                            class="form-control"
                            required
                            value=""
                          />
                        </div>
                        <input
                          name="alterar"
                          type="submit"
                          className="btn btn-warning"
                          value="Alterar"
                        />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default RegistrationData;
