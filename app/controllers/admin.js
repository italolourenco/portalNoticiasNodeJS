module.exports.formulario_inclusao_noticia = function(application, req, res){

	res.render("admin/form_add_noticia", {validacao : {}, noticia : {} });

}

module.exports.noticias_salvar = function(application, req, res){

	var noticia = req.body;

	req.assert('titulo','Título Obrigatorio').notEmpty();
	req.assert('resumo','Resumo é Obrigatorio').notEmpty();
	req.assert('resumo','Resumo deve conter entre 10 e 100 char').len(10, 100);
	req.assert('autor', 'Autor é Obrigatorio').notEmpty();
	req.assert('data_noticia', 'A data é obrigatoria').notEmpty().isDate({format: 'YYYY-MM-DD'});

	var erros = req.validationErrors();

	if(erros){

		res.render("admin/form_add_noticia", {validacao : erros, noticia : noticia});
		return;
	}

	var connection = application.config.dbConnection();
	var noticiasModel = new application.app.models.NoticiasDAO(connection);

	noticiasModel.salvarNoticia(noticia, function(error, result){
		res.redirect('/noticias');
	});
}

