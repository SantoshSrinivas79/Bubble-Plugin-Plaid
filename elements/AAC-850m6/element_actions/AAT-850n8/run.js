function(instance, properties, context) {

  var productsToCollectUpdate = [];
  
  if (properties.product_auth_update) {
    productsToCollectUpdate.push("auth");
  };
  
  if (properties.product_transactions_update) {
    productsToCollectUpdate.push("transactions");
  };
  
  if (properties.product_identity_update) {
    productsToCollectUpdate.push("identity");
  };
  if (properties.product_asset_update) {
    productsToCollectUpdate.push("assets");
  }; 
    if (properties.product_investment) {
    productsToCollect.push("investments");
  };

  //Load any data 
  
    handler = Plaid.create({
    clientName: properties.client_name_update,
    env: properties.environment_update.toLowerCase(),
    key: context.keys["Plaid Public Key"],
    product: productsToCollectUpdate,
    webhook: properties.webhookUrl_update,
    token: properties.public_token_update,
    onLoad: function() {  
      
      instance.triggerEvent("plaid_modal_showing");
      
    },
    onSuccess: function(public_token, metadata) {
      
      
      instance.triggerEvent("plaid_account_updated");
      
    },
    onExit: function(err, metadata) {

      if (err != null) {
        instance.publishState("plaid_error", err);
        instance.triggerEvent("plaid_account_failed");
      }

    }
  });

  //Do the operation
  
  handler.open();
  
}