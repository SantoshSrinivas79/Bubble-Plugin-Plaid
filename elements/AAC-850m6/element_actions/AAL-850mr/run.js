function(instance, properties, context) {

  var accountsRetrieved = [];
  var productsToCollect = [];
  
  if (properties.product_auth) {
    productsToCollect.push("auth");
  };
  
  if (properties.product_transactions) {
    productsToCollect.push("transactions");
  };
  
  if (properties.product_identity) {
    productsToCollect.push("identity");
  };
  if (properties.product_asset) {
    productsToCollect.push("assets");
  };
    if (properties.product_investment) {
    productsToCollect.push("investments");
  };
    

  //Load any data 
  
    handler = Plaid.create({
    clientName: properties.client_name,
    env: properties.environment.toLowerCase(),
    key: context.keys["Plaid Public Key"],
    product: productsToCollect,
    webhook: properties.webhookUrl,
    onLoad: function() {  
      
      instance.triggerEvent("plaid_modal_showing");
      
    },
    onSuccess: function(public_token, metadata) {

      instance.publishState("plaid_public_token", public_token);
     
      
      for (var x = 0; x < metadata.accounts.length; x++) {
        accountsRetrieved.push(metadata.accounts[x].id);
      }
      
      instance.publishState("plaid_accounts", accountsRetrieved);
      instance.triggerEvent("plaid_token_created");
      
    },
    onExit: function(err, metadata) {

      if (err != null) {
        instance.publishState("plaid_error", err);
        instance.triggerEvent("plaid_error_occurred");
      }

    }
  });

  //Do the operation
  
  handler.open();
  
}